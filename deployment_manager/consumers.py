from api.models import Token as VerbozeToken
from deployment_manager.models import RemoteDeploymentMachine
from channels import Channel
from django.db.models import Q
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType

import json

def get_valid_token(token):
    # delete old tokens
    VerbozeToken.objects.filter(~Q(expiry=None), expiry__lt=timezone.now()).delete()

    try:
        # only allow tokens created for remote deployment machines
        rdm_contenttype = ContentType.objects.get(model='remotedeploymentmachine')
        token_object = VerbozeToken.objects.get(id=token, content_type=rdm_contenttype)
    except (VerbozeToken.DoesNotExist, ValidationError):
        return None
    return token_object

def ws_connect(message, token):
    token_object = get_valid_token(token)
    # making sure RDM object exists for token
    if token_object and isinstance(token_object.content_object, RemoteDeploymentMachine):
        message.reply_channel.send({'accept': True})
        rdm = token_object.content_object
        rdm.channel_name = message.reply_channel
        rdm.save()
    else:
        message.reply_channel.send({'accept': False})

def ws_receive(message, token):
    token_object = get_valid_token(token)
    message_text = message.content.get("text")
    if token_object and isinstance(token_object.content_object, RemoteDeploymentMachine) and message_text:
        message_content = json.loads(message_text)
        # Perform logic when receiving data from RDM
        # ...
        #
    else:
        message.reply_channel.send({"accept": False})

def ws_disconnect(message, token):
    token_object = get_valid_token(token)
    if token_object and isinstance(token_object.content_object, RemoteDeploymentMachine):
        token_object.content_object.delete()
        token_object.delete()

