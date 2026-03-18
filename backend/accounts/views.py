from django.shortcuts import render
from .serializer import RegisterSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticate(request):
    return Response({'authenticated': True})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.delete_cookie('access', path='/', samesite='None')
        res.delete_cookie('refresh', path='/', samesite='None')
        return Response({'success': True})
    except:
        return Response({'success': False})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response({'success': False})
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile = request.user.userprofile
    serializer = UserProfile(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.userprofile
    return profile