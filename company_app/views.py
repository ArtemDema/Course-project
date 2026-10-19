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
                "contact_email": output.contact_email,
                "description": output.description,
                "name": output.name,
                "about_company": output.about_company
            } for output in Company.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = CompanySerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)