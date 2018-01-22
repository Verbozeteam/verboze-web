/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

type PropsType = {
    text: string,
};

type StateType = {
};

class StackHeader extends React.Component<PropsType, StateType> {

    render() {
        const { text } = this.props;

        return (
            <div style={styles.text}>
                {text}
                <div style={styles.bar}>
                </div>
            </div>
        );
    }
}

const styles = {
    text: {
        fontSize: 17,
        color: '#FFFFFF',
        height: 50,
    },
    bar: {
        height: 2,
        marginTop: 7,
        backgroundColor: '#D04F4C',
        width: 50,
    },
};

export { StackHeader };
