/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

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

    render() {
        var { width, height, slopeX } = this.props;

        return (
            <div style={{...styles.container, width: width-slopeX, height}}>
                <StackHeader text={"Thermostat"} />
            </div>
        );
    }
}
CentralACStack.contextTypes = {
    store: PropTypes.object
};

const styles = {
    container: {
        marginTop: 30,
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
};

export { CentralACStack };
