# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-06-24 10:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deployment_manager', '0010_auto_20180604_1313'),
    ]

    operations = [
        migrations.AddField(
            model_name='repository',
            name='local_path',
            field=models.CharField(default='', max_length=256, unique=True),
        ),
    ]
