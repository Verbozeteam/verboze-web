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
    curtainOpenings: {[string]: number}
};

class RoomState extends React.Component<PropsType, StateType> {

    static defaultProps = {
        opacity: 1.0,
    };

    state = {
        currentStage: 0,
        curtainOpenings: {},
    };

    _images = {
        background: require('../../../assets/images/room_state/empty_room.png'),
        window: require('../../../assets/images/room_state/window.png'),
        curtainLight: require('../../../assets/images/room_state/curtain_light.png'),
        doha: require('../../../assets/images/room_state/doha.jpg'),

        ['dimmer-1']: require('../../../assets/images/room_state/dimmer-1.png'),
        ['lightswitch-1']: require('../../../assets/images/room_state/lightswitch-1.png'),
        ['lightswitch-2']: require('../../../assets/images/room_state/lightswitch-2.png'),
        ['lightswitch-3']: require('../../../assets/images/room_state/lightswitch-3.png'),

        ['curtain-1-1']: require('../../../assets/images/room_state/curtain_left.png'),
        ['curtain-1-2']: require('../../../assets/images/room_state/curtain_right.png'),
        // ['curtain-2-1']: require('../../../assets/images/room_state/curtain_left.png'),
        // ['curtain-2-2']: require('../../../assets/images/room_state/curtain_right.png'),
    };

    computeCurtainsLight() {
        if (Object.keys(this.state.curtainOpenings).length === 0)
            return 0;

        var total = 1;
        for (var key in this.state.curtainOpenings) {
            total *= this.state.curtainOpenings[key] / 100;
        }
        return total;
    }

    computeLightBrightness() {
        const { roomState } = this.props;

        var brightness = 0;
        var num_lights = 0;
        for (var key in roomState) {
            if (roomState[key].category === 'light_switches') {
                brightness += roomState[key].intensity;
                num_lights += 1;
            } else if (roomState[key].category === 'dimmers') {
                brightness += roomState[key].intensity / 100;
                num_lights += 1;
            }
        }
        return Math.min(Math.max((brightness / num_lights + this.computeCurtainsLight()), 0), 1);
    }

    renderWindow() {
        var brightness = 30 + this.computeLightBrightness() * 70;

        return [
            <div key={"display-window-background"}
                style={{
                    ...styles.stackStyle,
                    backgroundImage: 'url(' + this._images.doha + ')',
                }}
            />,
            <div key={"display-window"}
                style={{
                    ...styles.stackStyle,
                    filter: 'brightness('+brightness+'%)',
                    transition: 'filter 300ms',
                    backgroundImage: 'url(' + this._images.window + ')',
                }}
            />
        ];
    }

    renderBase() {
        return [
            <div key={"display-base"}
                style={{
                    ...styles.stackStyle,
                    backgroundImage: 'url(' + this._images.background + ')',
                }}
            />
        ];
    }

    renderCurtain() {
        const { roomState } = this.props;
        const { curtainOpenings } = this.state;

        var brightness = 30 + this.computeLightBrightness() * 70;

        var layers = [];
        for (var key in roomState) {
            var thing = roomState[key];
            if (key+"-1" in this._images && key+"-2" in this._images) {
                switch (thing.category) {
                    case "curtains":
                        layers.push(<div key={"display-"+thing.id+"-1"}
                            style={{
                                ...styles.stackStyle,
                                //width: (100 - (curtainOpenings[thing.id] || 0)/3) + '%',
                                left: -curtainOpenings[thing.id] * 2,
                                filter: 'brightness('+brightness+'%)',
                                transition: 'filter 300ms',
                                backgroundImage: 'url(' + this._images[key+"-1"] + ')',
                            }} />);
                        layers.push(<div key={"display-"+thing.id+"-2"}
                            style={{
                                ...styles.stackStyle,
                                //width: (100 - (curtainOpenings[thing.id] || 0)/3) + '%',
                                left: curtainOpenings[thing.id] * 2,
                                filter: 'brightness('+brightness+'%)',
                                transition: 'filter 300ms',
                                backgroundImage: 'url(' + this._images[key+"-2"] + ')',
                            }} />);
                        if (thing.curtain != 0) {
                            const passedThing = thing;
                            setTimeout(() => requestAnimationFrame(this.stepCurtain(passedThing).bind(this)), 25);
                        }
                        break;
                }
            }
        }

        return <div key={"display-curtains"}>{layers}</div>;
    }

    stepCurtain(curtain: Object) {
        return (() => {
            var step = curtain.curtain === 1 ? 1 : -1;
            var curVal = this.state.curtainOpenings[curtain.id] || 0;
            var newVal = Math.min(Math.max(curVal + step, 0), 100);
            this.setState({curtainOpenings: {...this.state.curtainOpenings, [curtain.id]: newVal}});
        }).bind(this);
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

        layers.push(
            <div key={"display-curtain-light"}
                style={{
                    ...styles.stackStyle,
                    opacity: this.computeCurtainsLight(),
                    backgroundImage: 'url(' + this._images.curtainLight + ')',
                }}
            />
        );

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
                    setTimeout(() => requestAnimationFrame(this.stepTemperature.bind(this)), 300);
                    style.opacity = Math.min(Math.max(Math.abs(tempDiff) / 30, 0), 0.1);
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
                var tempDiff = thing.set_pt - thing.temp;
                if (tempDiff > 1 || tempDiff < -1)
                    step = tempDiff * 0.2;
                else if (tempDiff > 0)
                    step = 0.08;
                else
                    step = -0.08;
                var state_update = {
                    temp: Math.abs(tempDiff) < 0.1 ? thing.set_pt : thing.temp + step,
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

        var curOpacity: number = 1;
        if (currentStage === 0) {
            curOpacity = 0;
            setTimeout(() => requestAnimationFrame(this.animationFrame.bind(this)), 500);
        } else
            curOpacity = opacity || 0;

        var stacks = [];

        stacks = stacks
            .concat(this.renderWindow())
            .concat(this.renderCurtain())
            .concat(this.renderBase())
            .concat(this.renderLighting())
            .concat(this.renderTemperature())
        ;

        return (
            <div style={{...styles.container, ...{filter: 'brightness('+(curOpacity*70+30)+'%)'}}}>
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

        transition: 'filter 2000ms',
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
