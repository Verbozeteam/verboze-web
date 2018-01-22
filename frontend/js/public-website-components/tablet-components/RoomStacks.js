/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

import { LightsStack } from './LightsStack';
import { CurtainsStack } from './CurtainsStack';
import { CentralACStack } from './CentralACStack';
import { RoomServiceStack } from './RoomServiceStack';

type PropsType = {
    width: number,
    height: number,
};

type StateType = {
};

class RoomStacks extends React.Component<PropsType, StateType> {

    _img2 = require('../../../assets/images/yusuf.png');
    _img3 = require('../../../assets/images/fituri.jpg');
    _img4 = require('../../../assets/images/qstp.jpg');

    render() {
        const { width, height } = this.props;

        var numStacks = 4;
        var slope = 75;
        var extraStacksWidth = slope/2;
        var stackWidth = (width) / numStacks + slope;

        return (
            <div style={styles.container}>
                <div style={{minWidth: extraStacksWidth}}></div>
                <LightsStack height={height} width={stackWidth} slopeX={slope} backgroundColor={'#000000'} isFullscreen={false}>
                </LightsStack>
                <CurtainsStack height={height} width={stackWidth} slopeX={slope} isFullscreen={false}>
                </CurtainsStack>
                <CentralACStack height={height} width={stackWidth} slopeX={slope} isFullscreen={false}>
                </CentralACStack>
                <RoomServiceStack height={height} width={stackWidth} slopeX={slope} isFullscreen={false}>
                </RoomServiceStack>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
};

export { RoomStacks };
