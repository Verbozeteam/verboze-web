from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from channels import Group

# Hotel room
class Room(models.Model):
	tokens = GenericRelation('Token', related_query_name='rooms')
	name = models.CharField(max_length=128)
	floor = models.CharField(max_length=128)
	hotel = models.ForeignKey(
		'Hotel',
		on_delete=models.CASCADE,
		related_name='rooms',
		related_query_name='room',
	)
	identifier = models.CharField(max_length=32, default="")

	class Meta:
		unique_together = ('hotel', 'identifier',)

	def __str__(self):
		return "Room {} Floor {} at {}".format(
			self.name,
			self.floor,
			self.hotel
		)

	@property
	def websocket_group(self):
		return "room-{}".format(self.id)

	def ws_send_message(self, message):
		# send message to this room's group
		Group(self.websocket_group).send(message)


# Hotel where guest is staying in
# This will be used for hotel dashboard as well
class Hotel(models.Model):
	tokens = GenericRelation('Token', related_query_name='hotels')
	name = models.CharField(max_length=128)

	def __str__(self):
		return self.name

	@property
	def websocket_group(self):
		return "hotel-{}".format(self.id)

	def ws_send_message(self, message):
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
		return "hub-{}".format(self.id)

	def ws_send_message(self, message):
		# send message to this hub's group (only contains this hub)
		Group(self.websocket_group).send(message)
