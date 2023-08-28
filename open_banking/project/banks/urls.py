from django.urls import path

import banks.views

urlpatterns = [
    path('bank/<int:user_id>/', banks.views.BankRetrieveAPIView.as_view(), name='bank-read'),
]
