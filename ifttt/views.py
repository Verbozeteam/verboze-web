from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from ifttt.authentication import FromIFTTT

#
# API endpoint for IFTTT status report
#
@api_view(['GET'])
@authentication_classes([FromIFTTT])
@permission_classes([])
def status_view(request):
    return Response({}, status=status.HTTP_200_OK)

#
# API endpoint for IFTTT setup
#
@api_view(['POST'])
@authentication_classes([FromIFTTT])
@permission_classes([])
@csrf_exempt
def setup_view(request):
    return Response({}, status=status.HTTP_200_OK)

