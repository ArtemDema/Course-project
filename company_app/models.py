from django.db import models

# Create your models here.
class Company(models.Model):
    description_of_product = models.TextField(null=True, blank=True)
    contact_email = models.EmailField(null=True, blank=True)
    product = models.TextField(max_length=65, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    name = models.TextField(null=False, blank=False)
    date_of_creation = models.DateField(null=False, blank=False)
    volume_of_prodiction = models.TextField(null=False, blank=False)
    work_hours = models.TextField(null=False, blank=False)

class PhotoCompany(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    original = models.ImageField()
    compressed = models.ImageField()