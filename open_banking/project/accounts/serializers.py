from rest_framework import serializers
from .models import AccountsConsents, RetrievalGrant, AccountsBalances


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
