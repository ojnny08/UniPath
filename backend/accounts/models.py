from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=30)
    university = models.CharField(max_length=30)
    highschool = models.CharField(max_length=30)
    avg_grade = models.CharField(max_length=5)
    target_school =models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.username}'s Profile"