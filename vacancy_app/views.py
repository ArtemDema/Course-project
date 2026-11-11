from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class VacancyRender(APIView):
    def get(self, request):
        output = []
        
        vacancies = Vacancy.objects.select_related('owner', 'owner__photocompany').all()
        
        for vacancy in vacancies:
            has_photo = hasattr(vacancy.owner, 'photocompany')
            if has_photo and vacancy.owner.photocompany.original:
                avatar_url = (vacancy.owner.photocompany.original.url)
            else:
                avatar_url = None
        
        output = [
            {
                "id": output.id,
                "owner": output.owner.id,
                "experience": output.experience,
                "contacts": output.contacts,
                "salary_price": output.salary_price,
                "desired_position": output.desired_position,
                "type_of_vacancy": output.type_of_vacancy,
                "avatar": avatar_url
            } for output in Vacancy.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = VacancyRender(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

class VacancyViewRender(APIView):
    def get(self, request, id):
        vacancy = Vacancy.objects.filter(id=id).first()

        has_photo = hasattr(vacancy.owner, 'photocompany')
        if has_photo and vacancy.owner.photocompany.original:
            avatar_url = (vacancy.owner.photocompany.original.url)
        else:
            avatar_url = None
            
        output = {
            "id": vacancy.id,
            "name": f"{vacancy.owner.name}",
            "experience": vacancy.experience,
            "contacts": vacancy.contacts,
            "desired_position": vacancy.desired_position,
            "type_of_vacancy": vacancy.type_of_vacancy,
            "salary_price": vacancy.salary_price,
            "avatar": avatar_url,
            "owner": vacancy.owner.id
        } 
        
        return Response(output)