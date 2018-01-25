/* @flow */

import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import { connect as ReduxConnect } from 'react-redux';
import { AppWrapper } from "./redux/store";

import NavBar from './NavBar';
import Content from './Content';
import Footer from './Footer';

import css from '../../css/public_website/App.css';

type PropsType = {
    ...any,
};

type StateType = {
    ...any,
};


class App extends Component<PropsType, StateType> {

    state = {}

    render() {

        return (
            <div>
                <NavBar />

                <Content />

                <Footer />
            </div>
        );
    };
};

module.exports = {
    App: AppWrapper(withRouter(ReduxConnect(() => {return {}}, () => {return {}}) (App)))
}
