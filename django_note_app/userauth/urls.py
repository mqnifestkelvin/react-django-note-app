from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    
)
from .views import *
from django.urls import path
from .views import *


urlpatterns = [
    # authentication endpoints
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register', RegistrationAPIView.as_view(), name='register'),
    path('user/login', UserLoginAPIView.as_view(), name='login'),
    path('user/logout', UserLogoutAPIView.as_view(), name='logout'),
    path('user/password-reset', PasswordResetAPIView.as_view(), name='password-reset'),
    path('user/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmAPIView.as_view(), name='password-reset-confirm'),
    

    path('user/me', UserAPIView.as_view(), name='user'),

]