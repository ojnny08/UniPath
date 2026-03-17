from django.urls import path
from .views import logout, register

urlpatterns = [
    path('logout/', logout, name='user_logout'),
    path('register/', register, name='user_register')
]