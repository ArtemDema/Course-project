from django.db import models
from django.contrib.auth.models import AbstractUser
from company_app.models import Company

class WorkerUser(AbstractUser):
    first_name = models.TextField(max_length=25)
    email = models.EmailField(unique=True)
    last_name = models.TextField(max_length=35)
    owned_company = models.OneToOneField(Company, on_delete=models.CASCADE, null=True, blank=True)
    city = models.TextField(max_length=50, null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    about_me = models.TextField(null=True, blank=True)
    birthday = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    

class PhotoProfile(models.Model):
    profile = models.OneToOneField(WorkerUser, on_delete=models.CASCADE)
    original = models.ImageField(upload_to='avatars/', null=True, blank=True)