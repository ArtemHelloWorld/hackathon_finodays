import django.db.models
import django.urls


class Banks(django.db.models.Model):
    name = django.db.models.CharField()
    description = django.db.models.CharField(null=True)

    class Meta:
        verbose_name = 'банк'
        verbose_name_plural = 'банки'

    def __str__(self):
        return self.name

