from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

# Create your views here.
class ResumeRender(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "owner": f"{output.owner.first_name} {output.owner.last_name}",
                "owner_id": output.owner.id,
                "experience": output.experience,
                "desired_position_1": output.desired_position_1,
                "desired_position_2": output.desired_position_2,
                "desired_position_3": output.desired_position_3,
                "type_of_resume": output.type_of_resume,
                "salary_price": output.salary_price,
            } for output in Resume.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = ResumeRender(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

    def patch(self, request):
        resume_id = request.data.get('id')
        
        if resume_id is None:
            return Response({"error": "ID не передан"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            resume = Resume.objects.get(id=resume_id)
        except Resume.DoesNotExist:
            return Response({"error": "ID не найдено"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ResumeSerializer(resume, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)