import django.contrib.admin

import banks.models


@django.contrib.admin.register(banks.models.Banks)
class BanksAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        banks.models.Banks.name.field.name,
    )
    list_display_links = (
        banks.models.Banks.name.field.name,
    )
