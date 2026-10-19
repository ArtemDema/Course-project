from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .models import WorkerUser
from .serializer import UserSerializer

# Create your views here.
class CurrentUserView(APIView):
    def get(self, request):
        user = WorkerUser.objects.filter(id=0).first() 
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserListView(ListCreateAPIView):
    queryset = WorkerUser.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveUpdateAPIView):
    queryset = WorkerUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'