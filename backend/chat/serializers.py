from rest_framework import serializers
from .models import SignUp, Message


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = SignUp
        fields = ['email', 'name', 'password', 'confirmPassword', 'image', 'bio']

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirmPassword')

        email = validated_data.get('email')
        password = validated_data.get('password')
        name = validated_data.get('name')
        image = validated_data.get('image', None)
        bio = validated_data.get('bio')

        user = SignUp(
            email=email,
            name=name,
            image=image,
            bio=bio,
        )

        user.set_password(password) 
        user.save()

        return user
    



class MessageSerializer(serializers.ModelSerializer):
    receiver_profile = SignUpSerializer(read_only=True)
    sender_profile = SignUpSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id','sender', 'receiver', 'receiver_profile', 'sender_profile', 'message', 'is_read', 'date']
    
    def __init__(self, *args, **kwargs):
        super(MessageSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method=='POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 2