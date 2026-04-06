
from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]
