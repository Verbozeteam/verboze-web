# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-10-10 11:37
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20181009_1247'),
        ('deployment_manager', '0016_deploymentbuildoption'),
    ]

    operations = [
        migrations.AddField(
            model_name='remotedeploymentmachine',
            name='admin_user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='remote_deployment_machines', related_query_name='remote_deployment_machine', to='api.AdminUser'),
        ),
    ]