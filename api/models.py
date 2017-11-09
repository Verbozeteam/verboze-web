from django.db import models
from enum import IntEnum

class UserType(IntEnum):
    PHONE = 0
    HUB = 1
    DASHBOARD = 2

class Hotel(models.Model):
    name = models.CharField(max_length=256)

class HotelRoom(models.Model):
    class Meta:
        unique_together = (('hotel', 'number'),)

    hotel = models.ForeignKey(Hotel)
    number = models.IntegerField()

class ConnectionToken(models.Model):
    token = models.CharField(max_length=128, primary_key=True, unique=True)
    type = models.IntegerField()
    room = models.ForeignKey(HotelRoom)
