/* @flow */

import React, { Component } from 'react';

type PropsType = {};

type StateType = {};


export default class EmpoweringGuests extends Component<PropsType, StateType> {

    render() {
        return (
            <div style={styles.empoweringGuestsDiv}>
                <br/>
                <br/>
                <br/>
                <br/>
                Empowering Guests
            </div>
        );
    };
};

const styles = {
    empoweringGuestsDiv: {
        height: '100vh',
        background: 'grey',
        color: 'white',
    }
};
