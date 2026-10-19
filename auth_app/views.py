from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .models import WorkerUser
from .serializer import UserSerializer
from rest_framework import status

# Create your views here.
class CurrentUserView(APIView):
    def get(self, request):
        user = WorkerUser.objects.filter(id=0).first() 
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def patch(self, request):
        user = WorkerUser.objects.filter(id=0).first()
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # partial=True позволяет обновлять только присланные поля, а не все сразу
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save() # Изменяет данные в базе
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(ListCreateAPIView):
    queryset = WorkerUser.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveUpdateAPIView):
    queryset = WorkerUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'