from django.urls import path

import users.views

urlpatterns = [
    path('user/<int:user_id>/', users.views.UserRetrieveUpdateAPIView.as_view(), name='profile-read-update'),
]
