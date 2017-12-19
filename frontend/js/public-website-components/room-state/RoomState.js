/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

import { connect as ReduxConnect } from 'react-redux';

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
};

type StateType = {
    /*
     * 0: render faded out
     * 1: render full display
     */
    currentStage: number,
};

class RoomState extends React.Component<PropsType, StateType> {
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

        return null;
    }

    animationFrame() {
        const { currentStage } = this.state;
        if (currentStage === 0) {
            this.setState({currentStage: 1});
        }
    };

    render() {
        const { currentStage } = this.state;
        const { roomState } = this.props;

        var containerStyle = {...styles.container};
        containerStyle.backgroundImage = 'url(' + this._images.background + ')';
        if (currentStage === 0) {
            containerStyle.opacity = 0;
            setTimeout(() => requestAnimationFrame(this.animationFrame.bind(this)), 100);
        }

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

        transition: 'opacity 500ms',
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
    }
};

module.exports = { RoomState: ReduxConnect(mapStateToProps, mapDispatchToProps) (RoomState) };
