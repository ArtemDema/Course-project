from rest_framework.serializers import ModelSerializer
from .models import *

class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = ["description_of_product", "contact_email", "product", "description", "name", 
                  "date_of_creation", "volume_of_prodiction", "work_hours"]