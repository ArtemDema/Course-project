from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class VacancyRender(APIView):
    def get(self, request):
        output = [
            {
                "owner": output.owner.id,
                "experience": output.experience,
                "contacts": output.contacts,
                "salary_price": output.salary_price,
                "desired_position": output.desired_position,
                "type_of_vacancy": output.type_of_vacancy
            } for output in Vacancy.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = VacancyRender(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)