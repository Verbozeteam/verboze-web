# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-10 12:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20171210_1209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='expiry',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]