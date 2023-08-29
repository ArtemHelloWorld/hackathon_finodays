import django.contrib.admin

import accounts.models


@django.contrib.admin.register(accounts.models.Accounts)
class AccountAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        accounts.models.Accounts.id.field.name,
    )
    list_display_links = (
        accounts.models.Accounts.id.field.name,
    )


@django.contrib.admin.register(accounts.models.AccountsBalances)
class AccountsBalancesAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        accounts.models.AccountsBalances.id.field.name,
    )
    list_display_links = (
        accounts.models.AccountsBalances.id.field.name,
    )
