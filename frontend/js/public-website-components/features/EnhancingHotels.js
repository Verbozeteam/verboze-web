/* @flow */

import React, { Component } from 'react';

type PropsType = {};

type StateType = {};


export default class EnhancingHotels extends Component<PropsType, StateType> {

    render() {
        return (
            <div style={styles.enhancingHotelsDiv}>
                <br/>
                <br/>
                <br/>
                <br/>
                Enhancing Hotels
            </div>
        );
    };
};

const styles = {
    enhancingHotelsDiv: {
        height: '100vh',
        background: 'grey',
        color: 'white',
    }
};
