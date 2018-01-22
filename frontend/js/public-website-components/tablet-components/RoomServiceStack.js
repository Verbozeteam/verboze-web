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
};

type StateType = {
};

class RoomServiceStack extends React.Component<PropsType, StateType> {

    _serviceImage = require('../../../assets/images/service_back.jpg');

    render() {
        var { width, height, slopeX } = this.props;

        return (
            <FeatureStack height={height} width={width} slopeX={slopeX} image={this._serviceImage}>
                <StackHeader style={{height: 50}} text={"Services"} />
            </FeatureStack>
        );
    }
}
RoomServiceStack.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
    },
};

export { RoomServiceStack };
