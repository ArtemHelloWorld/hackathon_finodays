import django.contrib.admin

import accounts.models


@django.contrib.admin.register(accounts.models.Accounts)
class AccountAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        accounts.models.Accounts.number.field.name,
    )
    list_display_links = (
        accounts.models.Accounts.number.field.name,
    )
