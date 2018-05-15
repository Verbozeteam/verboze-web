from channels import Channel

from django.core.exceptions import ValidationError


def ws_connect(message):
    print('ws_connect')
    message.reply_channel.send({'accept': True})
    pass

def ws_receive(message):
    print('ws_receive')
    print(message)
    pass

def ws_disconnect(message):
    print('ws_disconnect')
    pass
