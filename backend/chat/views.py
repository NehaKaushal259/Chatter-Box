from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SignUpSerializer
from django.contrib.auth import authenticate


# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *



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
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "image": user.image.url if user.image else None,
                    "bio": user.bio,
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
def update_profile(request):
    email= request.data.get("email")

    try:
        user = User.objects.get(email=email)
        
        user.name = request.data.get("name", user.name)
        user.bio = request.data.get("bio", user.bio)

        if request.FILES.get("image"):
            user.image = request.FILES.get("image")

        user.save()

        return Response({
            "name" : user.name,
            "email" : user.email,
            "bio": user.bio,
            "image" : user.image.url if user.image else None,
        })
    
    except User.DoesNotExist:
        return Response({"error" : "User not found"}, status=404)




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
    




@api_view(['GET'])
def get_user(request):
    users = User.objects.exclude(email=request.GET.get("email"))

    data = [
        {
            "id" : u.id,
            "name" : u.name,
            "email" : u.email,
            "image": u.image.url if u.image else None
        }
        for u in users
    ]
    return Response(data)


@api_view(['POST'])
def send_request(request):
    try:
        from_user = User.objects.get(email=request.data.get("from_email"))
        to_user = User.objects.get(id=request.data.get("to_id"))
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    FriendRequest.objects.create(
        from_user = from_user,
        to_user = to_user
    )
    return Response({"message" : "Request Sent"})


@api_view(['GET'])
def get_request(request):
    try:
        # email = request.GET.get("email")
        email = request.GET.get("email", "").strip().lower()
        print("EMAIL RECEIVED:", email) 

        if not email:
            return Response({"error": "Email required"}, status=400)

        # user = User.objects.get(email=email)
        user = User.objects.get(email=email)
        if not user:
            # return Response({"error" : "User not found"}, status=404)
            return Response([], status=200)

        requests = FriendRequest.objects.filter(
            to_user=user,
            status="pending"
        )

        data = [
            {
                "id": r.id,
                "from_user": {
                    "id": r.from_user.id,
                    "name": r.from_user.name,
                }
            }
            for r in requests
        ]
        print("EMAIL RECEIVED:", email)
        return Response(data)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    except Exception as e:
        print("ERROR:", e)   # 👈 CHECK TERMINAL
        return Response({"error": "Server error"}, status=500)
    


