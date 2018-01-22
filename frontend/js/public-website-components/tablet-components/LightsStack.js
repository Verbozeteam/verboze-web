/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

import { FeatureStack } from './FeatureStack';
import { StackHeader } from './StackHeader';

type PropsType = {
    width: number,
    height: number,
    slopeX: number,
    isFullscreen: boolean,
    backgroundColor?: string,
};

type StateType = {
};

class LightsStack extends React.Component<PropsType, StateType> {

    _lightsImage = require('../../../assets/images/lightbulb.jpg');

    render() {
        var { width, height, slopeX, backgroundColor } = this.props;

        return (
            <FeatureStack height={height} width={width} slopeX={slopeX} backgroundColor={backgroundColor} image={this._lightsImage}>
                <StackHeader style={{height: 50}} text={"Lights"} />
                <div style={{width:30, height:30, marginLeft: width-slopeX-60, marginTop:  0, backgroundColor:'red'}}></div>
                <div style={{width:30, height:30, marginLeft: width-slopeX-60, marginTop: 10, backgroundColor:'red'}}></div>
                <div style={{width:30, height:30, marginLeft: width-slopeX-60, marginTop: 10, backgroundColor:'red'}}></div>
                <div style={{width:30, height:30, marginLeft: width-slopeX-60, marginTop: 10, backgroundColor:'red'}}></div>
            </FeatureStack>
        );
    }
}
LightsStack.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
    },
};

export { LightsStack };
