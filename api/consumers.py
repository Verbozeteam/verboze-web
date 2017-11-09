import json
from api.models import ConnectionToken, UserType

def ws_connect(message):
    message.reply_channel.send({"accept": True})

def ws_receive(message):
    text = message.content.get('text')
    if text:
        text = json.loads(text)
        token = text['token']

        T = ConnectionToken.objects.get(token=token)

        if T.type == UserType.PHONE or T.type == UserType.DASHBOARD:
            pass
        elif T.type == UserType.HUB:
            pass

        message.reply_channel.send({"text": json.dumps({"status": "aight", "yourshit": text})})