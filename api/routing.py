from channels import route
from api.consumers import ws_connect, ws_receive, ws_disconnect

websocket_routing = [
	# called when websocket connect
	route("websocket.connect", ws_connect),

    # called when websocket disconnects
    route('websocket.disconnect', ws_disconnect),

	# called when websocket gets sent data
	route("websocket.receive", ws_receive),
]