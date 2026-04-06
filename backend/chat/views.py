from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignUpSerializer
from django.contrib.auth import authenticate


# Create your views here.

class signUpView(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=201)
        
        return Response(serializer.errors, status=400)
    



class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request,
                            email=email,
                            password=password)
        
        if user is not None:
            return Response({
                "message" : "Login successful",
                "email" : user.email,
                "name" : user.name 
            }, status=200)
        else:
            return Response({
                "error" : "Invalid email or password"
            }, status=400)