
from django.urls import path
from .views import *
from .views import check_user, reset_password

# contact us

from .views import contact_view

urlpatterns = [
    path('signup/', signUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-profile/', update_profile, name='udate-profile'),

    path('users/', get_user),
    path('send-request/', send_request),
    path('friend-requests/', get_request),
]



# CONTACT US


# urlpatterns = [
#     path('api/contact/', contact_view),
#     path('api/complaints/', get_complaints),
# ]






# email : lucky121@gamil.com , password : lucky1212     {admin}

