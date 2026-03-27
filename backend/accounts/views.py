from django.shortcuts import render
from .serializer import RegisterSerializer, UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        res = super().post(request, *args, **kwargs)
        token = res.data

        access = token['access']
        refresh = token['refresh']

        res.set_cookie(
            key='access',
            value=access,
            httponly=True,
            samesite='None',
            secure=True,
            path='/'
        )
        res.set_cookie(
            key='refresh',
            value=refresh,
            httponly=True,
            samesite='None',
            secure=True,
            path='/'
        )
        res.data = {"success": True}
        return res

class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        
        try:
            refresh_token = request.COOKIES.get('refresh')
            request.data['refresh'] = refresh_token

            if not refresh_token:
                return None
            
            res = super().post(request, *args, **kwargs)
            token = res.data

            access = token['access']

            res.set_cookie(
                key='access',
                value=access,
                httponly=True,
                samesite='None',
                secure=True,
                path='/'
            )
            res.data = {"refreshed": True}
            return res
        except:
            res.data = {"refreshed": False}


class AuthenticateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'success': True})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            res = Response({'success': True})
            res.delete_cookie('access', path='/', samesite='None')
            res.delete_cookie('refresh', path='/', samesite='None')
            return res
        except:
            return Response({'success': False})

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Exception as e:
            print(e)
            return Response({'success': False})

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.userprofile
        serializer = UserProfileSerializer(data=profile)
        return Response(serializer.data)
    
    def put(self, request):
        profile = request.user.userprofile
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
