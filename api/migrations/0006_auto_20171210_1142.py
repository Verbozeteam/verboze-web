# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-10 11:42
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20171210_1140'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='token',
            name='expired',
        ),
        migrations.AddField(
            model_name='token',
            name='expiry',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2017, 12, 10, 11, 42, 23, 920570, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
