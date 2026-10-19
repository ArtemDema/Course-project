from django.db import models
from auth_app.models import WorkerUser

# Create your models here.
class Resume(models.Model):
    owner = models.OneToOneField(WorkerUser, on_delete=models.CASCADE)
    experience = models.TextField(null=True, blank=True)
    desired_position_1 = models.TextField()
    desired_position_2 = models.TextField(null=True, blank=True)
    desired_position_3 = models.TextField(null=True, blank=True)
    type_of_resume = models.TextField(null=True, blank=True)
    salary_price = models.TextField(null=True, blank=True)