# Generated by Django 4.2.4 on 2023-08-27 13:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_accountsconsents'),
    ]

    operations = [
        migrations.CreateModel(
            name='RetrievalGrant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('documentType', models.CharField(default='Поручение на извлечение', editable=False)),
                ('OGRN', models.IntegerField()),
                ('creationDateTime', models.DateTimeField(auto_now_add=True, verbose_name='дата и время создания ресурса')),
                ('expirationDateTime', models.DateTimeField(verbose_name='дата и время истечения срока действия поручения на извлечение')),
                ('consent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.accountsconsents')),
            ],
            options={
                'verbose_name': 'поручение на извлечение',
                'verbose_name_plural': 'поручения на извлечение',
                'ordering': ['-creationDateTime'],
            },
        ),
    ]
