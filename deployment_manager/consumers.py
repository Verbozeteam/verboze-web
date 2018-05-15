from channels import Channel

from django.core.exceptions import ValidationError

# class RemoteDeploymentMachine:
#     def __init__(self, reply_channel):
#         self.reply_channel = reply_channel
#
#     def send(self, message):
#         Channel(self.reply_channel).send(message)

def ws_connect(message):
    print('ws_connect')

    message.reply_channel.send({'accept': True})
    # rdm = RemoteDeploymentMachine(message.reply_channel)

    # rdm.send({'accept': True})
    pass

def ws_receive(message):
    print('ws_receive')
    print(message)
    pass

def ws_disconnect(message):
    print('ws_disconnect')
    pass
