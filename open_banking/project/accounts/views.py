import random

from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveDestroyAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.response import Response

from .models import AccountsConsents, RetrievalGrant, Accounts, AccountsBalances
from .serializers import AccountsConsentsSerializer, RetrievalGrantSerializer, AccountsBalancesSerializer


class AccountsConsentsCreateAPIView(CreateAPIView):
    queryset = AccountsConsents.objects.all()
    serializer_class = AccountsConsentsSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.get('Data')
        if data:
            data['status'] = 'AwaitingAuthorisation'
            serializer = self.get_serializer(data=data)

            if serializer.is_valid():
                instance = serializer.save()  # Save the object and get the instance

                RetrievalGrant.objects.create(
                    consent=instance,
                    OGRN=random.randint(10000000, 90000000),
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class AccountsConsentsRetrieveDestroyAPIView(RetrieveDestroyAPIView):
    queryset = AccountsConsents.objects.all()
    serializer_class = AccountsConsentsSerializer
    lookup_url_kwarg = 'consent_id'


class RetrievalGrantRetrieveAPIView(RetrieveAPIView):
    queryset = RetrievalGrant.objects.all()
    serializer_class = RetrievalGrantSerializer
    lookup_url_kwarg = 'consent_id'
    lookup_field = 'consent'


class AccountsListAPIView(ListAPIView):
    queryset = Accounts.objects.all()
    serializer_class = RetrievalGrantSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        wrapped_response = {'Account': serializer.data}

        return Response(wrapped_response)


class AccountsRetrieveAPIView(RetrieveAPIView):
    queryset = Accounts.objects.all()
    serializer_class = RetrievalGrantSerializer
    lookup_url_kwarg = 'account_id'


class AccountsBalancesRetrieveAPIView(RetrieveAPIView):
    queryset = AccountsBalances.objects.all()
    serializer_class = AccountsBalancesSerializer
    lookup_url_kwarg = 'account_id'
    lookup_field = 'account'


class BalancesListAPIView(ListAPIView):
    queryset = AccountsBalances.objects.all()
    serializer_class = AccountsBalancesSerializer
