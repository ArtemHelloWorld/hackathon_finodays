from rest_framework import serializers
from .models import AccountsConsents, RetrievalGrant, AccountsBalances, Accounts, Transactions


class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = '__all__'


class AccountsConsentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountsConsents
        fields = '__all__'


class RetrievalGrantSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetrievalGrant
        fields = '__all__'


class AccountsBalancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountsBalances
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = '__all__'
