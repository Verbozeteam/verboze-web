from django.conf.urls import url, include
from rest_framework import routers
from ifttt import views

urlpatterns = [
    url(r'^status/?$', views.status_view),
    url(r'^setup/?$', views.setup_view),
    # url(r'^', include(router.urls)),
]
