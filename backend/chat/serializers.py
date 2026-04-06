from rest_framework import serializers
from .models import SignUp


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = SignUp
        fields = ['email', 'name', 'password', 'confirmPassword', 'image']

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

        user = SignUp(
            email=email,
            name=name,
            image=image
        )

        user.set_password(password) 
        user.save()

        return user