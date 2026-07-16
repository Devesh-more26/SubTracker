# Authentication Fixes for SubscriptionTracker2

## Summary
Your current backend and frontend have the pieces for authentication, but they are not wired correctly. The main problems are:
- `RegisterSerializer` saves raw passwords.
- `RegisterView` and `LoginView` are implemented as `ModelViewSet` with custom `post` methods that are not the right pattern.
- `api/urls.py` uses router registration for auth endpoints instead of direct view paths.
- Frontend forms do not send any request to the backend.
- Login form and backend do not agree on whether login uses `username` or `email`.

---

## Files with problems and how to fix them

### `Backend/api/serializers.py`
Problem:
- `RegisterSerializer` does not hash the password.
- `password` should be `write_only`.
- `serializer.save()` currently stores the raw password in the database.

Fix:
- Add `password = serializers.CharField(write_only=True)`.
- Add a `create()` method that calls `user.set_password(validated_data['password'])` and then `user.save()`.

Example:
```python
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
```

---

### `Backend/api/views.py`
Problem:
- `RegisterView` and `LoginView` extend `ModelViewSet` but define `post()` directly.
- A `ModelViewSet` expects `create()` for POST, so these methods may not be used correctly.
- `Response(serializer.error)` is invalid; it should be `Response(serializer.errors, status=400)`.
- Login does not create a session or token, only checks credentials.
- Login request uses `username` but frontend shows `email`.

Fix:
- Use `APIView` or `GenericAPIView` for register/login.
- Use `permission_classes = [permissions.AllowAny]` for both endpoints.
- Return serializer errors correctly.
- For login, either use Django session auth with `login(request, user)` or use JWT tokens.
- Keep request field names consistent between frontend and backend.

Example register view:
```python
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User Created'}, status=201)
        return Response(serializer.errors, status=400)
```

Example login view with session auth:
```python
from django.contrib.auth import authenticate, login

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login Successful'})
        return Response({'message': 'Invalid Credentials'}, status=401)
```

If you want JWT auth, install `djangorestframework-simplejwt` and return tokens:
```python
from rest_framework_simplejwt.tokens import RefreshToken

if user is not None:
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })
```

---

### `Backend/api/urls.py`
Problem:
- Auth endpoints are registered with `DefaultRouter`, which is not the right structure for custom auth views.
- `router.register('register', RegisterView, basename='register')` assumes a viewset.

Fix:
- Use normal `path()` routing for auth views.

Example:
```python
from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('subscription/', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
```

If you want to keep `SubscriptionViewSet`, keep it on the router and add auth URLs separately.

---

### `frontend/src/components/Register.jsx`
Problem:
- Inputs have no `name` or controlled state.
- Form has no `onSubmit` handler.
- No API request is made.
- The register form currently does not send `username`, `email`, and `password` to the backend.

Fix:
- Add `useState` for form values.
- Add `name`, `value`, and `onChange` to each input.
- Add `handleSubmit` to POST data to backend.
- Use correct backend URL.

Example:
```jsx
import React, { useState } from 'react'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='username' value={form.username} onChange={handleChange} placeholder='Username' />
      <input name='email' value={form.email} onChange={handleChange} placeholder='Email' />
      <input name='password' type='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Register</button>
    </form>
  )
}

export default Register
```

---

### `frontend/src/components/Lgoin.jsx`
Problem:
- Same issues as `Register.jsx`: no state, no submit handler, no API call.
- The component name `Lgoin` is misspelled.
- Inputs are placeholders only and do not bind values.
- The login form shows `email` but backend uses `username`.

Fix:
- Rename component to `Login.jsx` or fix import references.
- Use controlled inputs and `fetch` to send login data.
- Keep backend field names consistent.

Example:
```jsx
import React, { useState } from 'react'

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='username' value={form.username} onChange={handleChange} placeholder='Username or email' />
      <input name='password' type='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
```

If you want login by email, update backend to authenticate by email instead of username.

---

### `Backend/config/settings.py`
Problem:
- CORS is present, but if the frontend needs CSRF or cookies, more config may be required.
- No REST framework authentication settings are configured.

Fix:
- If using JWT, add `simplejwt` settings and `DEFAULT_AUTHENTICATION_CLASSES`.
- If using session auth, ensure `CORS_ALLOWED_ORIGINS` includes `http://localhost:5173` and add `CSRF_TRUSTED_ORIGINS` if needed.

Example for JWT:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

---

## Best path to successful authentication with your current files
1. Keep `Backend/api/models.py` as is for `User` unless you need custom fields.
2. Fix `Backend/api/serializers.py` to hash passwords.
3. Replace auth viewsets in `Backend/api/views.py` with APIViews or generic views.
4. Use explicit URL paths in `Backend/api/urls.py` for `register/` and `login/`.
5. Fix frontend forms in `frontend/src/components/Register.jsx` and `frontend/src/components/Lgoin.jsx` so they send real POST requests.
6. Decide whether you want:
   - session auth with Django login, or
   - JWT auth with `djangorestframework-simplejwt`.
7. Test with `POST http://localhost:8000/register/` and `POST http://localhost:8000/login/` first using a tool like Postman or browser network inspector.

---

## Recommended fix order
1. `Backend/api/serializers.py`
2. `Backend/api/views.py`
3. `Backend/api/urls.py`
4. `frontend/src/components/Register.jsx`
5. `frontend/src/components/Lgoin.jsx`
6. `Backend/config/settings.py`

---

## Important note
Do not use `serializer.save()` on `User` data without hashing the password. That is the hardest bug in your current implementation.
