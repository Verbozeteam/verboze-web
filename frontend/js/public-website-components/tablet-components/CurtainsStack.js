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

class CurtainsStack extends React.Component<PropsType, StateType> {
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
                if (thing.category === 'curtains')
                    my_things.push(thing);
            }
            if (JSON.stringify(my_things) !== JSON.stringify(things))
                this.setState({things: my_things});
        }
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

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
                <div style={styles.stackContent}>
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
CurtainsStack.contextTypes = {
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

export { CurtainsStack };
