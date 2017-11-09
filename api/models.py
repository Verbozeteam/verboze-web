from django.db import models
from enum import IntEnum

class UserType(IntEnum):
    PHONE = 0
    HUB = 1
    DASHBOARD = 2


class ConnectionToken(models.Model):
    token = models.CharField(max_length=128, primary_key=True, unique=True)
    type = models.IntegerField()
