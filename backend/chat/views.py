from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SignUpSerializer
from django.contrib.auth import authenticate


# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response



User = get_user_model()


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

        try:
            user = User.objects.get(email=email)

            if user.check_password(password):   # ✅ correct way
                return Response({
                    "message": "Login successful",
                    "email": user.email,
                    "name": user.name
                }, status=200)
            else:
                return Response({
                    "error": "Invalid email or password"
                }, status=400)

        except User.DoesNotExist:
            return Response({
                "error": "User not found"
            }, status=404)
        





@api_view(['POST'])
def check_user(request):
    try:
        email = request.data.get('email')

        if not email:
            return Response({"error": "Email required"}, status=400)

        exists = User.objects.filter(email=email).exists()

        return Response({"exists": exists})

    except Exception as e:
        print("ERROR:", e)   # 👈 THIS LINE IS VERY IMPORTANT
        return Response({"error": "Server error"}, status=500)
    







@api_view(['POST'])
def reset_password(request):

    # User = get_user_model()
    # user = User.objects.get(email=email)

    try:
        email = request.data.get('email')
        password = request.data.get('password')   # ✅ get password

        if not email or not password:
            return Response({"error": "Email required"}, status=400)

        user = User.objects.get(email=email)

        user.set_password(password)   # 🔐 important
        user.save()

        return Response({"message": "Password updated successfully"})

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    except Exception as e:
        print("ERROR:", e)   # 👈 VERY IMPORTANT
        return Response({"error": "Server error"}, status=500)
    

