from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .models import WorkerUser
from company_app.models import Company
from .serializer import UserSerializer
from rest_framework import status

# Create your views here.
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(ListCreateAPIView):
    queryset = WorkerUser.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveUpdateAPIView):
    queryset = WorkerUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        
        if WorkerUser.objects.filter(email=data.get('email')).exists():
            return Response(
                {"error": "Користувач з такою поштою вже існує"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            company_instance = None
            user_role = data.get('role')
            
            if user_role == 'owner':
                user_first_name = data.get('first_name', '')
                company_title = f"Компанія {user_first_name}".strip()
                company_instance = Company.objects.create(name=company_title)

            user = WorkerUser.objects.create_user(
                username=data.get('email'),
                email=data.get('email'),
                password=data.get('password'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                owned_company=company_instance
            )
            
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as error:
            return Response(
                {"error": f"Помилка: {str(error)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )