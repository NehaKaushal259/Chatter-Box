
from django.urls import path
from .views import *


urlpatterns = [
    path('signup/', signUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-profile/', update_profile, name='udate-profile'),

    path('users/', get_user),
    path('send-request/', send_request),
    path('friend-requests/', get_request),
]







# email : lucky121@gamil.com , name : lucky, password : lucky@1212     {admin}
# email : kalash123@gmail.com, name : kalash, password : kalash123 