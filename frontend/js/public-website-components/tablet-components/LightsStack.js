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

class LightsStack extends React.Component<PropsType, StateType> {
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
                if (thing.category === 'light_switches' || thing.category === 'dimmers')
                    my_things.push(thing);
            }
            if (JSON.stringify(my_things) !== JSON.stringify(things))
                this.setState({things: my_things});
        }
    }

    setLightIntensity(id: string, intensity: number) {
        WebSocketCommunication.sendMessage({
            [id]: {
                ...this.context.store.getState().connection.roomState[id],
                intensity,
            }
        });
        this.context.store.dispatch(connectionActions.setThingPartialState(id, {intensity}));
    }

    renderFullscreen() {
        var { width, height, slopeX } = this.props;

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
            </div>
        );
    }

    renderStack() {
        const { things } = this.state;
        const { width, height, slopeX } = this.props;

        var intensitiesIndicators = null;
        if (things.length > 0) {
            var numBars = things.length;
            var numEmptyBars = Math.max(0, numBars-1);
            var totalWidth = 50;
            var barWidth = totalWidth / (numBars + numEmptyBars);
            var bars = [];
            for (var i = 0; i < numBars; i++) {
                if (things[i].intensity)
                    bars.push(<div key={"bar-"+i} style={{...styles.onBar, width: barWidth}} />);
                else
                    bars.push(<div key={"bar-"+i} style={{...styles.offBar, width: barWidth}} />);
                if (i !== numBars - 1)
                    bars.push(<div key={"ebar-"+i} style={{width: barWidth}} />);
            }
            intensitiesIndicators = <div style={styles.intensitiesContainer}>{bars}</div>;
        }

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
                <div style={styles.stackContent}>
                    {intensitiesIndicators}
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
LightsStack.contextTypes = {
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

export { LightsStack };
