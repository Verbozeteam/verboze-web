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

class CurtainsStack extends React.Component<PropsType, StateType> {
    _unsubscribe: () => null = () => null;

    _accentColor: string = "#D04F4C";

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

    renderCurtainView(index: number) {
        var curtain = this.state.things[index];
        var text = index === -1 ? "All" : curtain.id;
        return (
            <div key={"curtain-"+index}>
                <div style={tabStyles.texts}>{text}</div>
                <div style={tabStyles.controlsContainer}>
                    <MagicCircle
                                 width={40}
                                 height={40}
                                 extraStyle={{marginLeft: 0}}
                                 glowColor={this._accentColor} />
                    <MagicCircle
                                 width={40}
                                 height={40}
                                 extraStyle={{marginLeft: 20}}
                                 glowColor={this._accentColor} />
                    <MagicCircle
                                 width={40}
                                 height={40}
                                 extraStyle={{marginLeft: 20}}
                                 glowColor={this._accentColor} />
                </div>
            </div>
        );
    }

    renderSeparator(index: number) {
        return (
            <div key={"curtains-separator-"+index} style={tabStyles.separatorContainer}>
                <div style={tabStyles.separator} />
            </div>
        );
    }

    renderFullscreen() {
        const { things } = this.state;
        var { width, height, slopeX } = this.props;

        var allView = null;
        if (things.length > 0) {
            allView = (
                <div style={tabStyles.allContainer}>
                    {this.renderCurtainView(-1)}
                </div>
            );
        }

        var thingsView = null;
        if (things.length > 0) {
            thingsView = things.map(((t, i) => this.renderCurtainView(i)).bind(this));
            for (var i = 1; i < things.length; i++)
                thingsView.splice(i, 0, this.renderSeparator(i));
        }

        return (
            <div style={{...tabStyles.container, width: width-slopeX-tabStyles.container.margin*2, height: height-80}}>
                <div style={tabStyles.tab}>{allView}</div>
                <div style={tabStyles.tab} />
                <div style={tabStyles.tab}>{thingsView}</div>
            </div>
        );
    }

    renderStack() {
        const { things } = this.state;
        const { width, height, slopeX } = this.props;

        return (
            <div style={{...stackStyles.container, width: width-slopeX, height}}>
                <div style={stackStyles.stackContent}>
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

const tabStyles = {
    container: {
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'hidden',
        margin: 15,
        marginTop: 60,
        display: 'flex',
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    allContainer: {
        position: 'absolute',
        bottom: 0,
    },
    separatorContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#444444',
    },
    texts: {
        fontWeight: 'lighter',
        color: '#ffffff',
        fontSize: 16,
    },
    controlsContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
};

const stackStyles = {
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
