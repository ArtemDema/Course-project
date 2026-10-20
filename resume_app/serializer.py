from rest_framework.serializers import ModelSerializer
from .models import *

class ResumeSerializer(ModelSerializer):
    class Meta:
        model = Resume
        fields = ["owner", "experience", "desired_position_1", "desired_position_2", "desired_position_3",
                  "type_of_resume", "salary_price", "id"]