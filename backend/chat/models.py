from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import random
import string

# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, name, password, **extra_fields)
    
    
def generate_user_id():
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(6))

class SignUp(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='profile/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    custom_id = models.CharField(
        max_length=10,
        unique=True,
        default=generate_user_id
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email



class FriendRequest(models.Model):
    from_user = models.ForeignKey(SignUp, on_delete=models.CASCADE, related_name="sent_requests")
    to_user = models.ForeignKey(SignUp, on_delete=models.CASCADE, related_name="received_requests")
    status = models.CharField(max_length=10, choices=[
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected")
    ], default="pending")

    def __str__(self):
        return f"{self.from_user} -> {self.to_user}"
    






# for Contact US page


# class Contact(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     issue_type = models.CharField(max_length=50)
#     message = models.TextField()
#     screenshot = models.URLField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

    