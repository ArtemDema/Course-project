from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from company_app.models import Company

class WorkerUser(AbstractUser):
    first_name = models.TextField(max_length=25)
    email = models.EmailField(unique=True)
    last_name = models.TextField(max_length=35)
    first_name = models.TextField(max_length=25)
    position = models.TextField(null=True, blank=True)
    phone_number = PhoneNumberField(null=False, blank=False)
    owned_company = models.OneToOneField(Company, on_delete=models.CASCADE)

class Worker(models.Model):
    user = models.OneToOneField(WorkerUser, on_delete=models.CASCADE)
    worker_company = models.OneToOneField(Company, on_delete=models.CASCADE)

class PhotoProfile(models.Model):
    profile = models.OneToOneField(WorkerUser, on_delete=models.CASCADE)
    original = models.ImageField()
    compressed = models.ImageField()