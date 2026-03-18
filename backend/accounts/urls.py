from django.urls import path
from .views import authenticate, logout, register, update_profile

urlpatterns = [
    path('auth/', authenticate),
    path('logout/', logout, name='user_logout'),
    path('register/', register, name='user_register'),
    path('update_profile/', update_profile)
]