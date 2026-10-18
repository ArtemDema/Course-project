from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from company_app.models import Company

class WorkerUser(AbstractUser):
    first_name = models.TextField(max_length=25)
    email = models.EmailField(unique=True)
    last_name = models.TextField(max_length=35)
    phone_number = PhoneNumberField(null=False, blank=False)
    owned_company = models.OneToOneField(Company, on_delete=models.CASCADE, null=True, blank=True)
    city = models.TextField(max_length=50, null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    about_me = models.TextField(null=True, blank=True)

class Resume(models.Model):
    owner = models.OneToOneField(WorkerUser, on_delete=models.CASCADE)
    experience = models.TextField(null=True, blank=True)
    desired_position_1 = models.TextField()
    desired_positio_2 = models.TextField(null=True, blank=True)
    desired_position_3 = models.TextField(null=True, blank=True)
    

class PhotoProfile(models.Model):
    profile = models.OneToOneField(WorkerUser, on_delete=models.CASCADE)
    original = models.ImageField()
    compressed = models.ImageField()