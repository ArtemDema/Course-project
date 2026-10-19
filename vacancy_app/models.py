from django.db import models
from company_app.models import Company

# Create your models here.
class Vacancy(models.Model):
    owner = models.ForeignKey(Company, on_delete=models.CASCADE)
    experience = models.TextField(null=True, blank=True)
    contacts = models.TextField(null=True, blank=True)
    salary_price = models.TextField(null=True, blank=True)
    type_of_vacancy = models.TextField(null=True, blank=True)
    desired_position = models.TextField(null=True, blank=True)