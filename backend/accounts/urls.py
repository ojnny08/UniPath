from django.urls import path
from .views import AuthenticateView, LogoutView, RegisterView, ProfileView

urlpatterns = [
    path('auth/', AuthenticateView.as_view()),
    path('logout/', LogoutView.as_view(), name='user_logout'),
    path('register/', RegisterView.as_view(), name='user_register'),
    path('update_profile/', ProfileView.as_view)
]