from django.urls import path
from .views import PostsView, AuthorPostsView, PostDetialView, CreatePostView

urlpatterns = [
    path('view_all_posts/', PostsView.as_view()),
    path('create_post/', CreatePostView.as_view()),
    path('view_author_posts/', AuthorPostsView.as_view()),
    path('manage_post/', PostDetialView.as_view()),
]