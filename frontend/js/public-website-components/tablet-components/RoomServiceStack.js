/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

import * as connectionActions from '../redux/actions/connection';
const { WebSocketCommunication } = require('../../js-api-utils/WebSocketCommunication');

import { MagicCircle } from './MagicCircle';

type PropsType = {
    width: number,
    height: number,
    slopeX: number,
    isFullscreen: boolean,
};

type StateType = {
    things: Array<Object>,
};

class RoomServiceStack extends React.Component<PropsType, StateType> {
    _unsubscribe: () => null = () => null;
    _dndColor: string = '#D04F4C';
    _rsColor: string = '#2b9fff';

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
                if (thing.category === 'hotel_controls')
                    my_things.push(thing);
            }
            if (JSON.stringify(my_things) !== JSON.stringify(things))
                this.setState({things: my_things});
        }
    }

    toggle(id: string, toggleDND: boolean): null {
        var { room_service, do_not_disturb } = this.state.things[0];
        if (toggleDND) {
            do_not_disturb = 1 - do_not_disturb;
            room_service = 0;
        } else {
            room_service = 1 - room_service;
            do_not_disturb = 0;
        }

        WebSocketCommunication.sendMessage({
            [id]: {
                ...this.context.store.getState().connection.roomState[id],
                room_service,
                do_not_disturb
            }
        });
        this.context.store.dispatch(connectionActions.setThingPartialState(id, {room_service, do_not_disturb}));
    }

    renderFullscreen() {
        const { things } = this.state;
        const { width, height, slopeX } = this.props;

        if (!things.length)
            return <div />

        var toggler = b => (() => this.toggle(things[0].id, b)).bind(this);

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
                <div style={styles.buttonsContainer}>
                    <div style={styles.buttonContainer} onClick={toggler(false)}>
                        <MagicCircle width={40} height={40} isOn={things[0].room_service} text={things[0].room_service ? "On" : ""} textColor={'#ffffff'} glowColor={this._rsColor} />
                        <div style={styles.buttonText}>{"Room Service"}</div>
                    </div>
                    <div style={styles.buttonContainer} onClick={toggler(true)}>
                        <MagicCircle width={40} height={40} isOn={things[0].do_not_disturb} text={things[0].do_not_disturb ? "On" : ""} textColor={'#ffffff'} glowColor={this._dndColor} />
                        <div style={styles.buttonText}>{"Do not disturb"}</div>
                    </div>
                </div>
            </div>
        );
    }

    renderStack() {
        const { things } = this.state;
        const { width, height, slopeX } = this.props;

        var statusIndicator = null;
        if (things.length > 0) {
            var numBars = 3;
            var totalWidth = 50;
            var barWidth = totalWidth / numBars;
            var rsStyle = things[0].room_service ? {...styles.onBar, ...{backgroundColor: this._rsColor}} : styles.offBar;
            var dndStyle = things[0].do_not_disturb ? {...styles.onBar, ...{backgroundColor: this._dndColor}} : styles.offBar;
            statusIndicator = (
                <div style={styles.intensitiesContainer}>
                    <div style={{...rsStyle, width: barWidth}} />
                    <div style={{width: barWidth}} />
                    <div style={{...dndStyle, width: barWidth}} />
                </div>
            );
        }

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
                <div style={styles.stackContent}>
                    {statusIndicator}
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
RoomServiceStack.contextTypes = {
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
        left: 45,
    },
    buttonsContainer: {
        marginLeft: 50,
        marginTop: 100,
    },
    buttonContainer: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'lighter',
        color: '#ffffff',
        lineHeight: '40px',
    },
    intensitiesContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 2,
    },
    onBar: {
        height: 2,
        backgroundColor: '#ffffff',
    },
    offBar: {
        height: 1,
        backgroundColor: '#888888',
    },
};

export { RoomServiceStack };
