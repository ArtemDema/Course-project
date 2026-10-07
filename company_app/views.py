from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class CompanyRender(APIView):
    def get(self, request):
        output = [
            {
                "description_of_product": output.description_of_product, 
                "contact_email": output.contact_email, 
                "product": output.product, 
                "description": output.description, 
                "name": output.name, 
                "date_of_creation": output.date_of_creation, 
                "volume_of_prodiction": output.volume_of_prodiction,
                "work_hours": output.work_hours
            } for output in Company.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = CompanySerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)