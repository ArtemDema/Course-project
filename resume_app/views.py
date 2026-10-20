from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class ResumeRender(APIView):
    def get(self, request):
        output = [
            {
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