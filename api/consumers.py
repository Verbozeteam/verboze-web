from channels import Group
from channels.sessions import channel_session

import json
from api.models import ConnectionToken, UserType

@channel_session
def ws_connect(message):
    # path should look like /stream/<token>/
    token = message['path'].split("/")[-2]
    print(token)
    T = ConnectionToken.objects.get(token=token)
    message.channel_session['token'] = token
    if T.type == UserType.HUB:
        Group('hub-'+str(T.room.hotel.id)).add(message.reply_channel)
    else:
        Group('client-'+str(T.room.id)).add(message.reply_channel)
    message.reply_channel.send({"accept": True})

@channel_session
def ws_disconnect(message):
    token = message.channel_session['token']
    T = ConnectionToken.objects.get(token=token)
    if T.type == UserType.HUB:
        Group('hub-'+str(T.room.hotel.id)).discard(message.reply_channel)
    else:
        Group('client-'+str(T.room.id)).discard(message.reply_channel)

@channel_session
def ws_receive(message):
    text = message.content.get('text')
    if text:
        text = json.loads(text)
        token = message.channel_session['token']

        T = ConnectionToken.objects.get(token=token)

        if T.type == UserType.PHONE or T.type == UserType.DASHBOARD:
            Group('hub-'+str(T.room.hotel.id)).send({'text': json.dumps(text)})
        elif T.type == UserType.HUB:
            Group('client-'+str(T.room.id)).send({'text': json.dumps(text)})
        message.reply_channel.send({"accept": True})
    else:
        message.reply_channel.send({"accept": False})
