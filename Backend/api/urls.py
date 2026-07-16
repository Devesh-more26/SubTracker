from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

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