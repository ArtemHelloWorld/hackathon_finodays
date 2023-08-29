from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

import accounts.views
import banks.views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title='openApi',
        default_version='v1'
    ),
    public=True
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    # AccountConsents
    path('open-banking/v1.3/aisp/account-consents/', accounts.views.AccountsConsentsCreateAPIView.as_view(), name='account-consents-create'),
    path('open-banking/v1.3/aisp/account-consents/<int:consent_id>/', accounts.views.AccountsConsentsRetrieveDestroyAPIView.as_view(), name='account-consents-read-delete'),
    path('open-banking/v1.3/aisp/account-consents/<int:consent_id>/retrieval-grant/', accounts.views.RetrievalGrantRetrieveAPIView.as_view(), name='retrieval-grant-read'),


    # Balances
    path('open-banking/v1.3/aisp/accounts/<int:account_id>/balances/', accounts.views.AccountsBalancesRetrieveAPIView.as_view(), name='account-balances-read'),
    path('open-banking/v1.3/aisp/balances/', accounts.views.BalancesListAPIView.as_view(), name='balances-read'),

    # Accounts
    path('open-banking/v1.3/aisp/accounts/', accounts.views.AccountsListAPIView.as_view(), name='accounts-read'),
    path('open-banking/v1.3/aisp/accounts/<int:account_id>/', accounts.views.AccountsRetrieveAPIView.as_view(),
         name='account-read'),

    # Banks
    path('open-banking/v1.3/banks/', banks.views.BanksListAPIView.as_view(), name='banks-read'),
    path('open-banking/v1.3/bank/<int:bank_id>/accounts/', accounts.views.BankAccountsListAPIView.as_view(), name='bank-accounts-read'),

    path('api/v1/', include('users.urls')),

    path('docs', schema_view.with_ui('swagger'))
]
