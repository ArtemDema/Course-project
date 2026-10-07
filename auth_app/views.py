from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class UserRender(APIView):
    def get(self, request):
        output = [
            {
                "first_name": output.first_name, 
                "email": output.email, 
                "last_name": output.last_name, 
                "position": output.position, 
                "phone_number": output.phone_number, 
                "owned_company": output.owned_company
            } for output in WorkerUser.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)