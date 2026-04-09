from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class SignUp(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='profile/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email


