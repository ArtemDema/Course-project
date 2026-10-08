from rest_framework.serializers import ModelSerializer
from .models import *

class UserSerializer(ModelSerializer):
    class Meta:
        model = WorkerUser
        fields = ["first_name", "email", "last_name", "position", "phone_number", 
                  "owned_company", "nationality"]