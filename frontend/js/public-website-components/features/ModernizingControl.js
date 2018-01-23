/* @flow */

import React, { Component } from 'react';

type PropsType = {};

type StateType = {};


export default class ModernizingControl extends Component<PropsType, StateType> {

    render() {
        return (
            <div style={styles.modernizingControlDiv}>
                <br/>
                <br/>
                <br/>
                <br/>
                Modernizing Control
            </div>
        );
    };
};

const styles = {
    modernizingControlDiv: {
        height: '100vh',
        background: 'grey',
        color: 'white',
    }
};
