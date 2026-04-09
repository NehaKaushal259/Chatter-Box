
from django.urls import path
from .views import *
from .views import check_user, reset_password


urlpatterns = [
    path('signup/', signUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('check-user/', check_user),
    path('reset-password/', reset_password),
]

