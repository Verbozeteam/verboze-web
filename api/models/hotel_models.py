from django.db import models
from .user_models import HotelUser

#
#
class Service(models.Model):
    hotel = models.ForeignKey(HotelUser)

    def __str__(self):
        return "Service"
