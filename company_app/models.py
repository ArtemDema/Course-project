from django.db import models

# Create your models here.
class Company(models.Model):
    contact_email = models.EmailField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    name = models.TextField(null=False, blank=False)
    about_company = models.TextField(null=True, blank=True)

class PhotoCompany(models.Model):
    profile = models.OneToOneField(Company, on_delete=models.CASCADE, null=True, blank=True)
    original = models.ImageField(upload_to='avatars/', null=True, blank=True)