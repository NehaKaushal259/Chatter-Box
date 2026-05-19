
from django.urls import path
from .views import *


urlpatterns = [
    path('signup/', signUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-profile/', update_profile, name='udate-profile'),

    path('users/', get_user),
    path('send-request/', send_request),
    path('friend-requests/', get_request),
    path('friends/', get_friends),
    path('respond-request/', respond_request),

    path('my-messages/<user_id>/', MyInbox.as_view()),
    path('get-messages/<sender_id>/<receiver_id>/', GetMessages.as_view(), name='get_messages'),
    path('send-message/', send_message),
]   







# email : lucky121@gamil.com , name : lucky, password : lucky1212     {admin}
# email : kalash123@gmail.com, name : kalash, password : kalash123 