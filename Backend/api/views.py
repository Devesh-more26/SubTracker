from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
# User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {"message":"User Created"},
                status = 201
            )
        
        return Response(serializer.errors,status=400)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user_obj = User.objects.filter(email=email).first()
        if user_obj is None:
            return Response({'message': 'Invalid credentials'}, status=401)
            
        username_obj = user_obj.username

        user = authenticate(
            username=username_obj,
            password=password
        )

        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                "message":"Login Successful",
            })

        else:
            return Response({"message": "Invalide Credentials"},status=401)
    
class SubscriptionViewSet(viewsets.ModelViewSet):
    # permissions_classes = [permissions.AllowAny]
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    # def list(self, request):
    #     queryset = Subscription.objects.all()
    #     serializer = self.serializer_class(queryset, many=True)
    #     return Response(serializer.data)
    
    # def create(self, request):
    #     serializer = self.serializer_class(data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    #     print(serializer.errors) 
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)