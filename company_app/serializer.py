from rest_framework.serializers import ModelSerializer
from .models import *

class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ["contact_email", "description", "name", "about_company"]