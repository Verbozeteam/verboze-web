/* @flow */

import React, { Component } from 'react';

import ContentPage from './components/ContentPage';

type PropsType = {};

type StateType = {};

export default class EmpoweringGuests extends Component<PropsType, StateType> {
    _contentProps: {title: string, banner: string, sections:Array<Object>} = {
        title: "Empowering Guests make them feel that they have a say in the place they choose to stay",
        banner: require('../../../assets/images/page_top_banners/banner.png'),
        sections: [{
            name: "Empowering Guests",
            slug: "empowering-guests",
            pageUrl: "/empowering-guests"
        }, {
            name: "Control",
            slug: "control",
            pageUrl: "/empowering-guests"
        }, {
            name: "Request",
            slug: "request",
            pageUrl: "/empowering-guests"
        }, {
            name: "Keyless Entry",
            slug: "keyless-entry",
            pageUrl: "/empowering-guests"
        }],
    };

    render() {
        return (
            <ContentPage {...this._contentProps} >
                <div id="empowering-guests-info" style={ styles.textDivStyle }>
                    SOME CONTENT HERE ABOUT EMPOWERING GUESTS
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div id="control-info" style={ styles.textDivStyle }>
                    SOME CONTENT ABOUT CONTROL HERE
                    <br/>
                    <br/>
                    <br/>

                    <br/>
                    <br/>
                </div>
                <div id="request-info" style={ styles.textDivStyle }>
                    SOME CONTENT ABOUT REQUESTING ROOM SERVICE/CONCEIRGE/ORDER TO ROOM/DO NOT DISTIRUB HERE
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div id="keyless-entry-info" style={ styles.textDivStyle } >
                    SOME CONTENT ABOUT KEYLESS ENTRY HERE
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </ContentPage>
        );
    };
};

const styles = {
    textDivStyle: {
        fontWeight: 'lighter',
        paddingTop: 60
    }
};
