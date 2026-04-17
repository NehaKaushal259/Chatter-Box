
from django.urls import path
from .views import *
from .views import check_user, reset_password


urlpatterns = [
    path('signup/', signUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-profile/', update_profile, name='udate-profile'),

    path('users/', get_user),
    path('send-request/', send_request),
    path('friend-requests/', get_request),
]





# email : lucky121@gamil.com , password : lucky1212     {admin}

