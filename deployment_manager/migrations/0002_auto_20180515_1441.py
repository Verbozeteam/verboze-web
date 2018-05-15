# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-05-15 14:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deployment_manager', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RemoteDeploymentMachine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel_name', models.CharField(max_length=128)),
            ],
        ),
        migrations.AddField(
            model_name='runningdeployment',
            name='stdout',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='runningdeployment',
            name='status',
            field=models.TextField(blank=True, default=''),
        ),
    ]
