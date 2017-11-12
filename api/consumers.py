from api.models import Token, Hub, Hotel, Room
from channels import Group

from django.core.exceptions import ValidationError

import json

def get_valid_token(token):
	try:
		token_object = Token.objects.get(id=token, expired=False)
	except (Token.DoesNotExist, ValidationError):
		return None
	return token_object


def ws_connect(message, token):
	token_object = get_valid_token(token)
	if token_object:
		# valid token, accept connection
		message.reply_channel.send({"accept": True})
		# add reply_channel to Hub/Hotel/Room group
		group = token_object.content_object.websocket_group
		Group(group).add(message.reply_channel)
	else:
		# invalid connection, reject token
		message.reply_channel.send({"accept": False})


def ws_receive(message, token):
	token_object = get_valid_token(token)
	message_text = message.content.get('text')
	if token_object and message_text:
		# valid token, and text data found
		message.reply_channel.send({"accept": True})
		message_json = {
			"text": message_text
		}
		if isinstance(token_object.content_object, Hub):
			# message from hub
			hotel_dashboard = token_object.content_object.hotel
			# forward to hotel dashboard
			hotel_dashboard.send_message(message_json)
			# forward to guest guest room
			room_number = json.loads(message_text).get('room_number')
			if room_number:
				try:
					room = Room.objects.get(number=room_number)
					room.send_message(message_json)
				except Room.DoesNotExist:
					message.reply_channel.send({"text": "Invalid room number!"})

		elif isinstance(token_object.content_object, Hotel):
			# message from hotel dashboard
			hotel_hub = token_object.content_object.hubs.first()
			# forward message to hotel's hub
			hotel_hub.send_message(message_json)
		else:
			# message from guest room
			hotel_hub = token_object.content_object.hotel.hubs.first()
			# forward message to guest room's hotel's hub
			hotel_hub.send_message(message_json)
	else:
		# invalid token or not text data found, reject connection
		message.reply_channel.send({"accept": False})


def ws_disconnect(message, token):
	token_object = get_valid_token(token)
	if token_object:
		# valid token
		group = token_object.content_object.websocket_group
		# remove reply_channel from group
		Group(group).discard(message.reply_channel)
