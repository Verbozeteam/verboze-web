from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

import uuid
from channels import Group


# This model behaves identically to the default user model,
# but we’ll be able to customize it in the future if the need arises.
# It would be much more difficult to do so mid-project after initial migrations.
class User(AbstractUser):
    pass


# Hotel Guest
class Guest(models.Model):
	hotel = models.ForeignKey(
		'Hotel',
		on_delete=models.CASCADE,
		related_name='guests',
		related_query_name='guest',
		null=True,
		default=None
	)
	room = models.ForeignKey(
		'Room',
		on_delete=models.CASCADE,
		related_name='guests',
		related_query_name='guest',
		null=True,
		default=None
	)
	floor = models.ForeignKey(
		'Floor',
		on_delete=models.CASCADE,
		related_name='guests',
		related_query_name='guest',
		null=True,
		default=None
	)
	first_name = models.CharField(max_length=128, default="")
	last_name = models.CharField(max_length=128, default="")

	def __str__(self):
		return "{} {} at {}".format(
			self.first_name,
			self.last_name,
			self.room
		)


# Hotel room
class Room(models.Model):
	tokens = GenericRelation('Token', related_query_name='rooms')
	number = models.IntegerField()
	floor = models.ForeignKey(
		'Floor',
		on_delete=models.CASCADE,
		related_name='floors',
		related_query_name='floor'
	)
	hotel = models.ForeignKey(
		'Hotel',
		on_delete=models.CASCADE,
		related_name='rooms',
		related_query_name='room',
	)

	def __str__(self):
		return "Room {} {}".format(
			self.number,
			self.floor
		)

	@property
	def websocket_group(self):
		active_room_token = self.tokens.get(expired=False)
		return "room-{}".format(active_room_token.id)

	def send_message(self, message):
		# send message to this room's group
		Group(self.websocket_group).send(message)


# Hotel floor
class Floor(models.Model):
	number = models.IntegerField()
	hotel = models.ForeignKey(
		'Hotel',
		on_delete=models.CASCADE,
		related_name='floors',
		related_query_name='floor'
	)

	def __str__(self):
		return "Floor {} at {}".format(
			self.number,
			self.hotel
		)

# Hotel where guest is staying in
# This will be used for hotel dashboard as well
class Hotel(models.Model):
	tokens = GenericRelation('Token', related_query_name='hotels')
	name = models.CharField(max_length=128)

	def __str__(self):
		return self.name

	@property
	def websocket_group(self):
		active_hotel_token = self.tokens.get(expired=False)
		return "hotel-{}".format(active_hotel_token.id)

	def send_message(self, message):
		# send message to this hotel's group (only contains this hotel)
		Group(self.websocket_group).send(message)


# Hub central unit in hotel
class Hub(models.Model):
	tokens = GenericRelation('Token', related_query_name='hubs')
	hotel = models.ForeignKey(
		'Hotel',
		on_delete=models.CASCADE,
		related_name='hubs',
		related_query_name='hub'
	)

	def __str__(self):
		return "{}'s Hub".format(self.hotel)

	@property
	def websocket_group(self):
		active_hub_token = self.tokens.get(expired=False)
		return "hub-{}".format(active_hub_token.id)

	def send_message(self, message):
		# send message to this hub's group (only contains this hub)
		Group(self.websocket_group).send(message)


# Token we will use to determine who is sending data
# through websockets, and establish a connection with them
class Token(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)
	expired = models.BooleanField(default=False)

	# Mandatory fields for generic relation
	# ContentType and GenericForeignKey allows Token to have a ForeignKey to
	# any of our models, in this case ForeignKey to either Hub/Guest/Dashboard
	content_type = models.ForeignKey(ContentType)
	object_id = models.PositiveIntegerField() # Hub/Hotel/Room object id
	content_object = GenericForeignKey('content_type', 'object_id') # Hub/Hotel/Room object

	def __str__(self):
		if self.expired:
			return "[EXPIRED] Token for {}".format(self.content_object)
		return "[VALID] Token for {}".format(self.content_object)
