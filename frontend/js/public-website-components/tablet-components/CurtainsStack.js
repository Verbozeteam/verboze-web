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

class CurtainsStack extends React.Component<PropsType, StateType> {

    _curtainsImage = require('../../../assets/images/curtain_back.jpg');

    render() {
        var { width, height, slopeX } = this.props;

        return (
            <FeatureStack height={height} width={width} slopeX={slopeX} image={this._curtainsImage}>
                <StackHeader style={{height: 50}} text={"Curtains"} />
            </FeatureStack>
        );
    }
}
CurtainsStack.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
    },
};

export { CurtainsStack };
