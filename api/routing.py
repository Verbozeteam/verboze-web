from channels import route
from api.consumers import ws_connect, ws_receive

websocket_routing = [
	# called when websocket connect
	route("websocket.connect", ws_connect),

	# called when websocket gets sent data
	route("websocket.receive", ws_receive),
]