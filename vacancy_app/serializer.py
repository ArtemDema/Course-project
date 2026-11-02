from rest_framework.serializers import ModelSerializer
from .models import *

class VacancySerializer(ModelSerializer):
    class Meta:
        model = Vacancy
        fields = ["owner", "id", "experience", "contacts", "desired_positio_2", "type_of_vacancy",
                  "desired_position"]