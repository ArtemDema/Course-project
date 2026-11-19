from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
        
            output.append(
                {
                    "id": vacancy.id,
                    "owner": vacancy.owner.id,
                    "experience": vacancy.experience,
                    "contacts": vacancy.contacts,
                    "salary_price": vacancy.salary_price,
                    "desired_position": vacancy.desired_position,
                    "type_of_vacancy": vacancy.type_of_vacancy,
                    "avatar": avatar_url
                }
        )
        return Response(output)

    def post(self, request):
        serializer = VacancyRender(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

    def patch(self, request):
        vacancy_id = request.data.get('id')
        
        try:
            vacancy = Vacancy.objects.get(id=vacancy_id)
        except Vacancy.DoesNotExist:
            return Response({"error": "ID не найдено"}, status=status.HTTP_404_NOT_FOUND)

        serializer = VacancySerializer(vacancy, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        vacancy_id = request.data.get('id') or request.query_params.get('id')

        vacancy = Vacancy.objects.filter(id=vacancy_id).first()
        try:
            
            vacancy.delete()
            return Response({"message": "Резюме удалено"}, status=status.HTTP_204_NO_CONTENT)
        except Vacancy.DoesNotExist:
            return Response({"error": "Резюме не найдено"}, status=status.HTTP_404_NOT_FOUND)

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