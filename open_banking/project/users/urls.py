from django.urls import path

import users.views

urlpatterns = [
    path('user/register/', users.views.UserRegisterView.as_view(), name='user-create'),
]
