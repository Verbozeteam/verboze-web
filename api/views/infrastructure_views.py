from api.models import Room, Hotel, Hub
from api.permissions import IsHotelUser
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.serializers import RoomSerializer, HotelSerializer, HubSerializer
from api.authentication import ExpiringTokenAuthentication

from rest_framework.response import Response
from rest_framework import status

#
# API endpoint that allows Rooms to be viewed
# Request must be coming from Hotel User
# Only rooms that belong to User's Hotel will be returned
#
class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = (IsAuthenticated, IsHotelUser,)

    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_queryset(self):
        hotel_user = self.request.user.hotel_user
        # return all rooms in hotel that user belongs to
        return Room.objects.filter(hotel=hotel_user.hotel)


#
# API endpoint that allows Hotels to be viewed
#
class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = (IsAuthenticated, IsHotelUser,)

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


#
# API endpoint that allows Hubs to be viewed
#
class HubViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = (IsAuthenticated, IsHotelUser,)

    queryset = Hub.objects.all()
    serializer_class = HubSerializer

