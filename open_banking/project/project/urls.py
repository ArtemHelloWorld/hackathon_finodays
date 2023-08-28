from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

import accounts.views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # AccountConsents
    path('open-banking/v1.3/aisp/account-consents/', accounts.views.AccountsConsentsCreateAPIView.as_view(), name='account-consents-create'),
    path('open-banking/v1.3/aisp/account-consents/<int:consent_id>/', accounts.views.AccountsConsentsRetrieveDestroyAPIView.as_view(), name='account-consents-read-delete'),
    path('open-banking/v1.3/aisp/account-consents/<int:consent_id>/retrieval-grant/', accounts.views.RetrievalGrantRetrieveAPIView.as_view(), name='retrieval-grant-read'),

    # Accounts
    path('open-banking/v1.3/aisp/accounts/', accounts.views.AccountsListAPIView.as_view(), name='accounts-read'),
    path('open-banking/v1.3/aisp/accounts/<int:account_id>/', accounts.views.AccountsRetrieveAPIView.as_view(), name='account-read'),

    # Balances
    path('open-banking/v1.3/aisp/accounts/<int:account_id>/balances/', accounts.views.AccountsBalancesRetrieveAPIView.as_view(), name='account-balances-read'),
    path('open-banking/v1.3/aisp/balances/', accounts.views.BalancesListAPIView.as_view(), name='balances-read'),

    # Transactions

    path('api/v1/', include('users.urls')),
]
