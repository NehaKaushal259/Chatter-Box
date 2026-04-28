from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SignUpSerializer, MessageSerializer
from django.contrib.auth import authenticate
from django.db.models import Q, Subquery, OuterRef
from rest_framework import generics


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
                    "custom_id": user.custom_id
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
        user.custom_id = request.data.get("custom_id", user.custom_id)

        if request.FILES.get("image"):
            user.image = request.FILES.get("image")

        user.save()

        return Response({
            "name" : user.name,
            "custom_id": user.custom_id,
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
    email = request.GET.get("email")

    if not email:
        return Response({"error": "Email required"}, status=400)

    users = User.objects.exclude(email=email)

    data = [
        {
            "id" : u.id,
            "name" : u.name,
            "email" : u.email,
            "image": u.image.url if u.image else None,
            "custom_id": u.custom_id    
        }
        for u in users
    ]
    return Response(data)


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
                    "image": r.from_user.image.url if r.from_user.image else None,
                    "custom_id": r.from_user.custom_id
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
    


@api_view(['GET'])
def get_friends(request):
    email = request.GET.get("email")

    try:
        user = User.objects.get(email=email)

        friends = FriendRequest.objects.filter(
            (models.Q(from_user=user) | models.Q(to_user=user)),
            status="accepted"
        )

        data = []
        for f in friends:
            friend = f.to_user if f.from_user == user else f.from_user

            data.append({
                "id": friend.id,
                "name": friend.name,
                "email": friend.email,
                "image": friend.image.url if friend.image else None,
                "custom_id": friend.custom_id
            })

        return Response(data)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)




@api_view(['POST'])
def send_request(request):
    try:
        from_user = User.objects.get(email=request.data.get("from_email"))
        to_user = User.objects.get(id=request.data.get("to_id"))

        # 🔥 Prevent duplicate requests
        exists = FriendRequest.objects.filter(
            from_user=from_user,
            to_user=to_user
        ).exists()

        if exists:
            return Response({"message": "Already sent"}, status=200)

        FriendRequest.objects.create(
            from_user=from_user,
            to_user=to_user
        )

        return Response({"message": "Request Sent"})

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)



@api_view(['POST'])
def respond_request(request):
    try:
        req = FriendRequest.objects.get(id=request.data.get("request_id"))
        action = request.data.get("action")  # accepted / rejected

        if action not in ["accepted", "rejected"]:
            return Response({"error": "Invalid action"}, status=400)

        req.status = action
        req.save()

        return Response({"message": f"Request {action}"})

    except FriendRequest.DoesNotExist:
        return Response({"error": "Request not found"}, status=404)
    



# @api_view(['POST'])
# def send_message(request):
#     try:
#         sender_id = request.data.get("sender")
#         receiver_id = request.data.get("receiver")
#         text = request.data.get("text")

#         if not sender_id or not receiver_id or not text:
#             return Response({"error": "All fields required"}, status=400)

#         sender = User.objects.get(id=sender_id)
#         receiver = User.objects.get(id=receiver_id)

#         message = Message.objects.create(
#             sender=sender,
#             receiver=receiver,
#             text=text
#         )

#         return Response({
#             "id": message.id,
#             "sender": sender.id,
#             "receiver": receiver.id,
#             "text": message.text,
#             "timestamp": message.timestamp
#         }, status=201)

#     except User.DoesNotExist:
#         return Response({"error": "User not found"}, status=404)

#     except Exception as e:
#         print("ERROR:", e)
#         return Response({"error": "Server error"}, status=500)
    


# @api_view(['GET'])
# def get_messages(request):
#     user_id = request.GET.get("user_id")
#     friend_id = request.GET.get("friend_id")

#     if not user_id or not friend_id:
#         return Response({"error" : "Missing user_id or friend_id"}, status=400)
    
#     try:
#         messages = Message.objects.filter(
#             Q(sender_id=user_id, receiver_id=friend_id) | 
#             Q(sender_id=friend_id, receiver_id=user_id)
#         ).order_by("timestamp")

#         data = [
#             {
#                 "id": m.id,
#                 "sender": m.sender.id,
#                 "receiver": m.receiver.id,
#                 "text": m.text,
#                 "timestamp": m.timestamp.strftime("%H:%M")
#             }
#             for m in messages
#         ]
#         return Response(data)
    
#     except Exception as e:
#         print("Error : ", e)
#         return Response({"error": "Server Error"}, status=500)




# class MyInbox(generics.ListAPIView):
#     serializer_class = MessageSerializer

#     def get_queryset(self):
#         user_id = self.kwargs['user_id']

#         messages = Message.objects.filter(
#             id_in = Subquery(
#                 User.objects.filter(
#                     Q(sender_receiver = user_id) | 
#                     Q(receiver_sender = user_id)
#                 ).distinct().annotate(
#                     last_msg = Subquery(
#                         Message.objects.filter(
#                             Q(sender = OuterRef('id'), receiver = user_id) | 
#                             Q(receiver = OuterRef('id'), sender = user_id)
#                         ).order_by('-id')[:1].values_list('id',flat=True) 
#                     )
#                 ).values_list('last_msg', flat=True).order_by("-id")
#             )
#         ).order_by("-id")

#         return messages
    

class MyInbox(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = Message.objects.filter(
            Q(sender_id=user_id) | Q(receiver_id=user_id)
        ).order_by('-date')

        return messages
    

class GetMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        receiver_id = self.kwargs['receiver_id']

        return Message.objects.filter(
            sender__in=[sender_id, receiver_id],
            receiver__in=[sender_id, receiver_id]
        ).order_by("date")


# class GetMessages(generics.ListAPIView):
#     serializer_class = MessageSerializer
    
#     def get_queryset(self):
#         sender_id = self.kwargs['sender_id']
#         reciever_id = self.kwargs['reciever_id']
#         messages =  Message.objects.filter(sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id])
#         return messages

# class SendMessages(generics.CreateAPIView):
#     serializer_class = MessageSerializer


@api_view(['POST'])
def send_message(request):
    try:
        sender = User.objects.get(id=request.data.get("sender"))
        receiver = User.objects.get(id=request.data.get("receiver"))
        message = request.data.get("message")

        msg = Message.objects.create(
            sender=sender,
            receiver=receiver,
            message=message
        )

        return Response({
            "id": msg.id,
            "sender": msg.sender.id,
            "receiver": msg.receiver.id,
            "message": msg.message,
            "date": msg.date
        })

    except Exception as e:
        print("ERROR:", e)
        return Response({"error": "Failed to send message"}, status=500)