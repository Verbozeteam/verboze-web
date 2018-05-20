from api.models import Token as VerbozeToken
from deployment_manager.models import RemoteDeploymentMachine, Repository, Disk, Firmware
from deployment_manager.serializers import RepositorySerializer
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

def send_repo_data(message):
    repos = Repository.objects.all()
    serializer = RepositorySerializer(repos, many=True)
    message.reply_channel.send({'text': json.dumps({'repos': serializer.data})})

def update_rdm_disks(rdm, message_content):
    disks = message_content["disks"]

    # delete old disks
    rdm.disks.all().delete()

    for disk in disks:
        Disk.objects.create(remote_deployment_machine=rdm,
                            name=disk['name'],
                            identifier=disk['identifier'])

def update_rdm_firmwares(rdm, message_content):
    firmwares = message_content["firmwares"]

    # delete old firmwares
    rdm.firmwares.all().delete()

    for firmware in firmwares:
        Firmware.objects.create(remote_deployment_machine=rdm,
                                name=firmware['name'])

def ws_connect(message, token):
    token_object = get_valid_token(token)
    # making sure RDM object exists for token
    if token_object and isinstance(token_object.content_object, RemoteDeploymentMachine):
        message.reply_channel.send({'accept': True})

        # send repo information for client to clone/pull latest
        send_repo_data(message)

        # save channel name to be able to communicate with
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
        rdm = token_object.content_object
        # Perform logic when receiving data from RDM
        if message_content.get("disks"):
            update_rdm_disks(rdm, message_content)
        elif message_content.get("firmwares"):
            update_rdm_firmwares(rdm, message_content)
        else: # ignore message if not any of the above
            pass
    else:
        message.reply_channel.send({"accept": False})

def ws_disconnect(message, token):
    token_object = get_valid_token(token)
    if token_object and isinstance(token_object.content_object, RemoteDeploymentMachine):
        token_object.content_object.delete()
        token_object.delete()

