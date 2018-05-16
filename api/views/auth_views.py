import datetime
from django.utils import timezone
from django.http import JsonResponse
from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token as AuthToken
from api.models import Token as VerbozeToken
from deployment_manager.models import RemoteDeploymentMachine


class ObtainExpiringAuthToken(ObtainAuthToken):

    def create_remote_deployment_machine_ws_token(self, machine):
        #
        # TODO: handle case when existing RDM machine request a token
        # ...
        #

        # channel_name provided temporarly as it is required (TODO: We should change this)
        rdm = RemoteDeploymentMachine.objects.create(channel_name=machine)
        rdm_contenttype = ContentType.objects.get(model='remotedeploymentmachine')
        expiry = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        token = VerbozeToken.objects.create(expiry=expiry,
                                            content_type=rdm_contenttype,
                                            object_id=rdm.id)
        return token.id

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            auth_token, created =  AuthToken.objects.get_or_create(user=user)

            if not created:
                # delete old token and create a new one
                auth_token.delete()
                auth_token = AuthToken.objects.create(user=user)
                auth_token.created = datetime.datetime.utcnow()
                auth_token.save()

            # return a WS token for RDM if user is admin and machine provided
            machine = request.data.get('machine')
            if user.is_superuser and machine:
                ws_token = self.create_remote_deployment_machine_ws_token(machine)
                return JsonResponse({'token': auth_token.key, 'rdm_ws_token': ws_token})

            return JsonResponse({'token': auth_token.key})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
