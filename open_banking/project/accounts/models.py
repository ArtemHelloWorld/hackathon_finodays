import django.db.models
import django.urls
from django.contrib.postgres.fields import ArrayField, JSONField
from django.core.validators import RegexValidator

import users.models
import banks.models


class Accounts(django.db.models.Model):
    user = django.db.models.ForeignKey(users.models.User, on_delete=django.db.models.CASCADE)
    bank = django.db.models.ForeignKey(banks.models.Banks, on_delete=django.db.models.CASCADE)
    number = django.db.models.IntegerField()
    balance = django.db.models.IntegerField(default=0)
    date_created = django.db.models.DateField(auto_now_add=True, verbose_name='дата создания')
    date_update = django.db.models.DateField(auto_now=True, verbose_name='дата изменения')

    class Meta:
        verbose_name = 'счет'
        verbose_name_plural = 'счета'
        ordering = ['-date_created']

    def __str__(self):
        return self.number


class AccountsConsents(django.db.models.Model):
    creationDateTime = django.db.models.DateTimeField(auto_now_add=True, verbose_name='дата и время создания ресурса')
    status = django.db.models.CharField()
    statusUpdateDateTime = django.db.models.DateTimeField(auto_now_add=True,
                                                          verbose_name='дата и время обновления статуса ресурса ')
    permissions = ArrayField(django.db.models.CharField())
    expirationDateTime = django.db.models.DateTimeField(
        verbose_name='дата и время истечения срока действия разрешений')
    transactionFromDateTime = django.db.models.DateTimeField(
        verbose_name='дата и время начала периода запроса операции по счету')
    transactionToDateTime = django.db.models.DateTimeField(
        verbose_name='дата и время окончания периода запроса операции по счету')

    class Meta:
        verbose_name = 'разрешение на доступ к счетам'
        verbose_name_plural = 'разрешения на доступ к счетам'
        ordering = ['-creationDateTime']

    def __str__(self):
        return self.id


class RetrievalGrant(django.db.models.Model):
    consent = django.db.models.ForeignKey(AccountsConsents, on_delete=django.db.models.CASCADE)
    documentType = django.db.models.CharField(default='Поручение на извлечение', editable=False)
    OGRN = django.db.models.IntegerField()
    creationDateTime = django.db.models.DateTimeField(auto_now_add=True, verbose_name='дата и время создания ресурса')
    expirationDateTime = django.db.models.DateTimeField(auto_now_add=True, verbose_name='дата и время истечения срока действия поручения на извлечение')

    class Meta:
        verbose_name = 'поручение на извлечение'
        verbose_name_plural = 'поручения на извлечение'
        ordering = ['-creationDateTime']

    def __str__(self):
        return self.id


# todo: use validator
amount_regex = RegexValidator(regex=r'^\d{1,13}\.\d{2 }$')


class AccountsBalances(django.db.models.Model):
    account = django.db.models.ForeignKey(Accounts, on_delete=django.db.models.CASCADE)
    type = django.db.models.CharField()
    amount = django.db.models.JSONField()
    creditDebitIndicator = django.db.models.CharField()
    creditLine = ArrayField(django.db.models.CharField(), null=True, blank=True)
    dateTime = django.db.models.DateTimeField(verbose_name='дата, на которую рассчитан остаток')

    class Meta:
        verbose_name = 'остаток на счете'
        verbose_name_plural = 'остатки на счете'

    def __str__(self):
        return f'Остаток на счете {self.account}'


class Transactions(django.db.models.Model):
    sender_account = django.db.models.ForeignKey(Accounts, on_delete=django.db.models.CASCADE,
                                                 related_name='sender_account')
    receiver_account = django.db.models.ForeignKey(Accounts, on_delete=django.db.models.CASCADE,
                                                   related_name='receiver_account')
    transaction_type = django.db.models.CharField()
    amount = django.db.models.IntegerField()
    description = django.db.models.CharField()
    date_created = django.db.models.DateField(auto_now_add=True, verbose_name='дата создания')
    date_update = django.db.models.DateField(auto_now=True, verbose_name='дата изменения')

    class Meta:
        verbose_name = 'транзакция'
        verbose_name_plural = 'транзакции'
        ordering = ['-date_created']

    def __str__(self):
        return self.id
