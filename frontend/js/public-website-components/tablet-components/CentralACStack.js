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

class CentralACStack extends React.Component<PropsType, StateType> {

    _acImage = require('../../../assets/images/snowflake.jpg');

    render() {
        var { width, height, slopeX } = this.props;

        return (
            <FeatureStack height={height} width={width} slopeX={slopeX} image={this._acImage}>
                <StackHeader style={{height: 50}} text={"Thermostat"} />
            </FeatureStack>
        );
    }
}
CentralACStack.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
    },
};

export { CentralACStack };
