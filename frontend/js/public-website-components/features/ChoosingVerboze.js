/* @flow */

import React, { Component } from 'react';

type PropsType = {};

type StateType = {};


export default class ChoosingVerboze extends Component<PropsType, StateType> {

    render() {
        return (
            <div style={styles.choosingVerbozeDiv}>
                <br/>
                <br/>
                <br/>
                <br/>
                Choosing Verboze
            </div>
        );
    };
};

const styles = {
    choosingVerbozeDiv: {
        height: '100vh',
        background: 'grey',
        color: 'white',
    }
};
