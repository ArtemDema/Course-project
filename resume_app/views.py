from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

# Create your views here.
class ResumeRender(APIView):
    def get(self, request):
        output = []
        
        resumes = Resume.objects.select_related('owner', 'owner__photoprofile').all()
        
        for resume in resumes:
            has_photo = hasattr(resume.owner, 'photoprofile')
            if has_photo and resume.owner.photoprofile.original:
                avatar_url = (resume.owner.photoprofile.original.url)
            else:
                avatar_url = None
            
            output.append({
                "id": resume.id,
                "owner": f"{resume.owner.first_name} {resume.owner.last_name}",
                "owner_id": resume.owner.id,
                "experience": resume.experience,
                "desired_position_1": resume.desired_position_1,
                "desired_position_2": resume.desired_position_2,
                "desired_position_3": resume.desired_position_3,
                "type_of_resume": resume.type_of_resume,
                "salary_price": resume.salary_price,
                "avatar": avatar_url 
            }) 
        return Response(output)

    def post(self, request):
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            
            user_id = request.data.get('owner')
            
            if request.user.is_authenticated:
                serializer.save(owner=request.user)
            
            resume_instance = serializer.instance
            has_photo = hasattr(resume_instance.owner, 'photoprofile')
            if has_photo and resume_instance.owner.photoprofile.original:
                avatar_url = (resume_instance.owner.photoprofile.original.url)
            else:
                avatar_url = None

            response_data = {
                "id": resume_instance.id,
                "owner": f"{resume_instance.owner.first_name} {resume_instance.owner.last_name}",
                "owner_id": resume_instance.owner.id,
                "experience": resume_instance.experience,
                "desired_position_1": resume_instance.desired_position_1,
                "desired_position_2": resume_instance.desired_position_2,
                "desired_position_3": resume_instance.desired_position_3,
                "type_of_resume": resume_instance.type_of_resume,
                "salary_price": resume_instance.salary_price,
                "avatar": avatar_url
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

    def patch(self, request):
        resume_id = request.data.get('id')
        

        try:
            resume = Resume.objects.get(id=resume_id)
        except Resume.DoesNotExist:
            return Response({"error": "ID не найдено"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ResumeSerializer(resume, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        resume_id = request.data.get('id') or request.query_params.get('id')

        try:
            resume = Resume.objects.get(id=resume_id)
            resume.delete()
            return Response({"message": "Резюме удалено"}, status=status.HTTP_204_NO_CONTENT)
        except Resume.DoesNotExist:
            return Response({"error": "Резюме не найдено"}, status=status.HTTP_404_NOT_FOUND)


class ResumeViewRender(APIView):
    def get(self, request, id):
        resume = Resume.objects.filter(id=id).first()
        
        has_photo = hasattr(resume.owner, 'photoprofile')
        if has_photo and resume.owner.photoprofile.original:
            avatar_url = (resume.owner.photoprofile.original.url)
        else:
            avatar_url = None
            
        output = {
            "id": resume.id,
            "owner": f"{resume.owner.first_name} {resume.owner.last_name}".strip(),
            "owner_id": resume.owner.id,
            "experience": resume.experience,
            "desired_position_1": resume.desired_position_1,
            "desired_position_2": resume.desired_position_2,
            "desired_position_3": resume.desired_position_3,
            "type_of_resume": resume.type_of_resume,
            "salary_price": resume.salary_price,
            "avatar": avatar_url 
        } 
        
        return Response(output)