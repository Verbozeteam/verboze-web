from channels import include
from api.routing import websocket_routing

channel_routing = [
	include(websocket_routing, path=r"^/stream/"),
]