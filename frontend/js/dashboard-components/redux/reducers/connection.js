/* @flow */

import {
    SET_CONNECTION_STATE,
    SET_ROOMS,
    SET_ROOMS_GROUPS,
    SET_ROOM_CONFIG,
    SET_ROOM_ORDERS,
    SET_ROOM_THINGS_STATES,
    SET_ROOM_THING_STATE,
    SET_ROOM_THINGS_PARTIAL_STATES,
    SET_ROOM_THING_PARTIAL_STATE,
} from '../actions/connection';

import * as APITypes from '../../../js-api-utils/APITypes';
import * as ConnectionTypes from '../../../js-api-utils/ConnectionTypes';
import type { GroupType } from '../../../js-api-utils/ConfigManager';

type StateType = {
    connectionState: 0 | 1 | 2,
    rooms: {[roomId: string]: APITypes.Room},
    roomsGroups: {[roomId: string]: Array<GroupType>},
    roomConfigs: {[string]: ConnectionTypes.ConfigType},
    roomStates: {[string]: Object},
    roomsOrders: {[roomId: string]: Array<OrderType>}
};

const defaultState: StateType = {
    /* 0 - not connected, 1 - connecting, 2 - connected */
    connectionState: 0,
    rooms: {},
    roomsGroups: {},
    roomConfigs: {},
    roomStates: {},
    roomsOrders: {}
};

module.exports = (state: StateType = defaultState, action: Object) => {
    var new_state: StateType = JSON.parse(JSON.stringify(state));

    switch(action.type) {
        /** set WebSocket connection state */
        case SET_CONNECTION_STATE:
            new_state.connectionState = action.connectionState;
            break;

        /** sets registered rooms
        /*  Format: {room1ID: Room, room2ID: Room, ...}
         */
        case SET_ROOMS:
            for (var i = 0; i < action.rooms.length; i++) {
                new_state.rooms[action.rooms[i].identifier] = action.rooms[i]
            }
            break;

        /** sets groups for rooms  */
        case SET_ROOMS_GROUPS:
            new_state.roomsGroups = action.roomsGroups;
            break;

        /** sets config for a room */
        case SET_ROOM_CONFIG:
            new_state.roomConfigs[action.roomId] = action.config;
            break;

        /** room state manegement */
        case SET_ROOM_THING_STATE:
            if (!new_state.roomStates[action.roomId])
                new_state.roomStates[action.roomId] = {};
            new_state.roomStates[action.roomId][action.thingId] = action.state;
            break;
        case SET_ROOM_THINGS_STATES:
            if (!new_state.roomStates[action.roomId])
                new_state.roomStates[action.roomId] = {};
            new_state.roomStates[action.roomId] = {
                ...new_state.roomStates[action.roomId],
                ...action.thingToState
            };
            break;
        case SET_ROOM_THING_PARTIAL_STATE:
            new_state.roomStates[action.roomId][action.thingId] = {
            ...new_state.roomStates[action.roomId][action.thingId],
            ...action.state
            };
            break;
        case SET_ROOM_THINGS_PARTIAL_STATES:
            if (!new_state.roomStates[action.roomId])
                new_state.roomStates[action.roomId] = {};
            for (var k in action.thingToPartialState)
                new_state.roomStates[action.roomId][k] = {
                    ...new_state.roomStates[action.roomId][k],
                    ...action.thingToPartialState[k]
                };

        case SET_ROOM_ORDERS:
            new_state.roomsOrders[action.roomId] = action.orders;
            break;

        default:
            break;
    }

    return new_state;
}
