/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

import * as connectionActions from '../redux/actions/connection';
const { WebSocketCommunication } = require('../../js-api-utils/WebSocketCommunication');

type PropsType = {
    width: number,
    height: number,
    slopeX: number,
    isFullscreen: boolean,
};

type StateType = {
    things: Array<Object>,
};

class CentralACStack extends React.Component<PropsType, StateType> {
    _unsubscribe: () => null = () => null;

    state: StateType = {
        things: [],
    };

    componentWillMount() {
        const { store }= this.context;
        this._unsubscribe = store.subscribe(this.onReduxStateChanged.bind(this));
        this.onReduxStateChanged();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onReduxStateChanged() {
        const { store } = this.context;
        const reduxState = store.getState();

        const { things } = this.state;

        if (reduxState && reduxState.connection && reduxState.connection.roomState) {
            var my_things = [];
            for (var key in reduxState.connection.roomState) {
                var thing = reduxState.connection.roomState[key];
                if (thing.category === 'central_acs')
                    my_things.push(thing);
            }
            if (JSON.stringify(my_things) !== JSON.stringify(things))
                this.setState({things: my_things});
        }
    }

    setACFan(id: string, fan: number) {
        WebSocketCommunication.sendMessage({
            [id]: {
                ...this.context.store.getState().connection.roomState[id],
                fan,
            }
        });
        this.context.store.dispatch(connectionActions.setThingPartialState(id, {fan}));
    }

    setACTemp(id: string, temp: number) {
        WebSocketCommunication.sendMessage({
            [id]: {
                ...this.context.store.getState().connection.roomState[id],
                temp,
            }
        });
        this.context.store.dispatch(connectionActions.setThingPartialState(id, {temp}));
    }

    renderFullscreen() {
        const { width, height, slopeX } = this.props;

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
            </div>
        );
    }

    renderStack() {
        const { things } = this.state;
        const { width, height, slopeX } = this.props;

        var temp = "";
        if (things.length > 0)
            temp = things[0].temp.toFixed(1) + " °C";

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
                <div style={styles.stackContent}>
                    <div style={styles.temperatureNumber}>{temp}</div>
                </div>
            </div>
        );
    }

    render() {
        if (this.props.isFullscreen)
            return this.renderFullscreen();
        return this.renderStack();
    }
}
CentralACStack.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    stackContent: {
        position: 'absolute',
        bottom: 30,
        color: '#ffffff',
        left: 30,
    },
    temperatureNumber: {
        fontWeight: 'lighter',
        fontSize: 20,
    },
};

export { CentralACStack };
