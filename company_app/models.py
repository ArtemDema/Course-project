from django.db import models

# Create your models here.
class Company(models.Model):
    contact_email = models.EmailField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    name = models.TextField(null=False, blank=False)
    about_company = models.TextField(null=True, blank=True)

class Vacancy(models.Model):
    owner = models.ForeignKey(Company, on_delete=models.CASCADE)
    experience = models.TextField(null=True, blank=True)
    contacts = models.TextField()
    salary_price = models.TextField()

class PhotoCompany(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    original = models.ImageField()
    compressed = models.ImageField()