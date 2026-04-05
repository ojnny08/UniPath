from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Post
from .serializer import PostSerializer


# Create your views here.
class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    
class AuthorPostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        author=request.user
        posts = Post.objects.filter(author)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    
class PostDetialView(APIView):
    permission_classes = [IsAuthenticated]

    def get_post(self, request, pk):
        user = request.user
        post = Post.objects.get(id=pk)
        if post.author != user:
            raise PermissionDenied()
        
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=request.data)

        if request.user != post.author:
            return Response({'error': 'Not your post gang'}, status=403)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        post = Post.objects.get(id=pk)

        if request.user != post.author:
            return Response({'error': 'Not your post gang'}, status=403)
        
        post.delete()
        return Response({'Post delete'})