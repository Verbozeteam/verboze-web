/* @flow */

import React, { Component } from 'react';

import ContentPage from './components/ContentPage';

type PropsType = {};

type StateType = {};

export default class ChoosingVerboze extends Component<PropsType, StateType> {
    _contentProps: {title: string, banner: string, sections:Array<Object>} = {
        title: "Choosing Verboze is the best thing you will ever do to your Hotel",
        banner: require('../../../assets/images/page_top_banners/banner.png'),
        sections: [{
            name: "Choosing Verboze",
            slug: "choosing-verboze",
            pageUrl: "/choosing-verboze"
        }, {
            name: "Automation",
            slug: "automation",
            pageUrl: "/choosing-verboze"
        }, {
            name: "Replication",
            slug: "replication",
            pageUrl: "/choosing-verboze"
        }, {
            name: "Preferences",
            slug: "preferences",
            pageUrl: "/choosing-verboze"
        }]
    };

    render() {
        return (
            <ContentPage {...this._contentProps} >
                <div className="container" id="choosing-verboze-container">
                    <div id="choosing-verboze-info" style={ styles.textDivStyle }>
                        SOME CONTENT HERE ABOUT CHOOSING VERBOZE
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
                    <div id="automation-info" style={ styles.textDivStyle }>
                        SOME CONTENT ABOUT GETTING AUTOMATION HERE
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div id="replication-info" style={ styles.textDivStyle }>
                        SOME CONTENT ABOUT GETTING REPLICATION HERE
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
                    <div id="preferences-info" style={ styles.textDivStyle } >
                        SOME CONTENT ABOUT HOW THIS WILL PREFERENCES HERE
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
