/* @flow */

import React, { Component } from 'react';

import ContentPage from './components/ContentPage';

type PropsType = {};

type StateType = {};

export default class ModernizingControl extends Component<PropsType, StateType> {
    _contentProps: {title: string, banner: string, sections:Array<Object>} = {
        title: "Introducing the Hospitality Industry to the 21st Century",
        banner: require('../../../assets/images/page_top_banners/banner.png'),
        sections: [{
            name: "Modernizing Control",
            slug: "modernizing-control",
            pageUrl: "/modernizing-control"
        }, {
            name: "In-room Touchscreen",
            slug: "tablet",
            pageUrl: "/modernizing-control"
        }, {
            name: "Guest's Smartphone",
            slug: "smartphone",
            pageUrl: "/modernizing-control"
        }, {
            name: "Voice",
            slug: "voice",
            pageUrl: "/modernizing-control"
        }, {
            name: "Smart Room",
            slug: "smart-room",
            pageUrl: "/modernizing-control",
        }],
    };

    render() {
        return (
            <ContentPage {...this._contentProps} >
                <div id="modernizing-control-info" style={ styles.textDivStyle }>
                    <h1>Modernizing Control</h1>
                    <p>
                    SOME CONTENT HERE ABOUT MODERNIZING CONTROL
                    </p>
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
                <div id="tablet-info" style={ styles.textDivStyle }>
                    <h1>Touchscreen</h1>
                    SOME CONTENT ABOUT TABLET HERE
                    <br/>
                    <br/>
                    <br/>

                    <br/>
                    <br/>
                </div>
                <div id="smartphone-info" style={ styles.textDivStyle }>
                    <h1>Smartphone</h1>
                    SOME CONTENT ABOUT SMART PHONE HERE
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
                <div id="voice-info" style={ styles.textDivStyle } >
                    <h1>Voice Control</h1>
                    SOME CONTENT ABOUT VOICE HERE
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
                <div id="smart-room-info" style={ styles.textDivStyle }>
                    <h1>Smart Room</h1>
                    SOME CONTENT ABOUT TABLET HERE
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
        paddingTop: 60,
    }
};
