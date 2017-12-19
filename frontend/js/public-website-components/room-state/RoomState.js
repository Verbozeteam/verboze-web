/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

import { connect as ReduxConnect } from 'react-redux';

const connectionActions = require('../redux/actions/connection');
import { WebSocketCommunication } from '../../api-utils/WebSocketCommunication';

function mapStateToProps(state) {
    return {
        roomState: state.connection.roomState,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

type PropsType = {
    roomState: Object,
    opacity?: number,
};

type StateType = {
    /*
     * 0: render faded out
     * 1: render full display
     */
    currentStage: number,
};

class RoomState extends React.Component<PropsType, StateType> {

    static defaultProps = {
        opacity: 1.0,
    };

    state = {
        currentStage: 0,
    };

    _images = {
        background: require('../../../assets/images/room_state/empty_room.png'),

        ['dimmer-1']: require('../../../assets/images/room_state/dimmer-1.png'),
        ['lightswitch-1']: require('../../../assets/images/room_state/lightswitch-1.png'),
        ['lightswitch-2']: require('../../../assets/images/room_state/lightswitch-2.png'),
    };

    renderBase() {
        return null;
    }

    renderCurtain() {
        return null;
    }

    renderLighting() {
        const { roomState } = this.props;

        var layers = [];
        for (var key in roomState) {
            var thing = roomState[key];
            if (key in this._images) {
                switch (thing.category) {
                    case "light_switches":
                        layers.push(<div key={"display-"+thing.id}
                            style={{
                                ...styles.stackStyle,
                                backgroundImage: 'url(' + this._images[key] + ')',
                                opacity: thing.intensity,
                            }} />);
                        break;
                    case "dimmers":
                        layers.push(<div key={"display-"+thing.id}
                            style={{
                                ...styles.stackStyle,
                                backgroundImage: 'url(' + this._images[key] + ')',
                                opacity: thing.intensity / 100,
                            }} />);
                        break;
                }
            }
        }

        return <div key={"display-lights"}>{layers}</div>;
    }

    renderTemperature() {
        const { roomState } = this.props;

        for (var key in roomState) {
            var thing = roomState[key];
            if (thing.category === 'central_acs') {
                var style = {...styles.temperatureStyle};

                var tempDiff = thing.set_pt - thing.temp;
                if (Math.abs(tempDiff) > 0.01) {
                    setTimeout(() => requestAnimationFrame(this.stepTemperature.bind(this)), 100);
                    style.opacity = Math.min(Math.max(Math.abs(tempDiff) / 10, 0), 0.1);
                    if (tempDiff > 0)
                        style.backgroundColor = 'rgb(255, 0, 0)';
                    else
                        style.backgroundColor = 'rgb(0, 0, 255)';
                } else
                    style.opacity = 0;

                return <div key={'display-temp'} style={style} />
            }
        }

        return null;
    }

    stepTemperature() {
        const { roomState } = this.props;

        for (var key in roomState) {
            var thing = roomState[key];
            if (thing.category === 'central_acs') {
                var step;
                if (thing.set_pt - thing.temp > 1 || thing.set_pt - thing.temp < -1)
                    step = (thing.set_pt - thing.temp) * 0.07;
                else if (thing.set_pt - thing.temp > 0)
                    step = 0.07;
                else
                    step = -0.07;
                var state_update = {
                    temp: thing.temp + step,
                };
                if (Math.abs(state_update.temp - thing.temp) > 0.1) {
                    WebSocketCommunication.sendMessage({
                        [thing.id]: {
                            ...thing,
                            ...state_update,
                        }
                    });
                }
                this.context.store.dispatch(connectionActions.setThingPartialState(thing.id, state_update));
                return;
            }
        }
    }

    animationFrame() {
        const { currentStage } = this.state;
        if (currentStage === 0) {
            this.setState({currentStage: 1});
        }
    };

    render() {
        const { currentStage } = this.state;
        const { roomState, opacity } = this.props;

        var containerStyle = {...styles.container};
        containerStyle.backgroundImage = 'url(' + this._images.background + ')';
        if (currentStage === 0) {
            containerStyle.opacity = 0;
            setTimeout(() => requestAnimationFrame(this.animationFrame.bind(this)), 500);
        } else
            containerStyle.opacity = opacity;

        var stacks = [];

        stacks = stacks
            //.concat(this.renderBase())
            .concat(this.renderCurtain())
            .concat(this.renderLighting())
            .concat(this.renderTemperature())
        ;

        return (
            <div style={containerStyle}>
                {stacks}
            </div>
        );
    }
}
RoomState.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: 700,
        display: 'flex',
        flexDirection: 'row',
        color: 'red',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        maxWidth: 1600,

        transition: 'opacity 2000ms',
        opacity: 1,
    },
    stackStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        maxWidth: 1600,

        transition: 'opacity 300ms',
    },
    temperatureStyle: {
        width: '100%',
        height: '100%',
    },
};

module.exports = { RoomState: ReduxConnect(mapStateToProps, mapDispatchToProps) (RoomState) };
