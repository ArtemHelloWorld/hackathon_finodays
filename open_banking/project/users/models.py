import django.contrib.auth.models
import django.db.models
from django.core.validators import RegexValidator

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$')


class User(django.contrib.auth.models.AbstractUser):
    phone_number = django.db.models.CharField(validators=[phone_regex], max_length=17, blank=True)
    passport_number = django.db.models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'Пользователь {self.pk}'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['-date_joined', 'username']
