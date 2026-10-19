from rest_framework.serializers import ModelSerializer
from .models import WorkerUser # Лучше импортировать явно

class UserSerializer(ModelSerializer):
    class Meta:
        model = WorkerUser
        fields = [
            "id", "first_name", "email", "last_name", "city", 
            "owned_company", "education", "about_me", "date_joined", "birthday"
        ]