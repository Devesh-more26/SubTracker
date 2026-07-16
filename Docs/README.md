## Backend

*install venv*
```
python -m pip install virtualenv
```

*install django*
`python -m pip install django
`

*install django-cors-header / to connect frontend to backend*
`python -m pip install django-cors-headers`

*in project setting* 
`installed_app = [
    'corsheaders',
]

Middleware = [
    'corsheader.middlewares.CoreMiddlewares',
    'django.middleware.common.CommonMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]`


## Frontend

`npm create vite@latest`
`npm install`

*for routering purpose install react router*
`npm i react-router`

*install tailwindCSS*



# Questions
## 1. is this important for the authentication or not, then why this is written
```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'testserver']
```

## 2. what does this thing do , explain in simple terms
```python
 user_obj = User.objects.filter(email=email).first()
        if user_obj is None:
            return Response({'message': 'Invalid credentials'}, status=401)
```

## 3.explain all this terms in details , how this works

```python
router = DefaultRouter()
# router.register('user', UserViewSet, basename='user')
router.register('subscription', SubscriptionViewSet, basename='subscription')
# router.register('register', RegisterView, basename='register')
# router.register('login', LoginView, basename='login')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
```