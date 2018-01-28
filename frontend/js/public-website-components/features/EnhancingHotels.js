/* @flow */

import React, { Component } from 'react';

import ContentPage from './components/ContentPage';

type PropsType = {};

type StateType = {};

export default class EnhancingHotels extends Component<PropsType, StateType> {
    _contentProps: {title: string, banner: string, sections:Array<Object>} = {
        title: "Enhancing Hotels is our middle name, let us take care of it for You",
        banner: require('../../../assets/images/page_top_banners/banner.png'),
        sections: [{
            name: "Enhancing Hotels",
            slug: "enhancing-hotels",
            pageUrl: "/enhancing-hotels"
        }, {
            name: "Feedback",
            slug: "feedback",
            pageUrl: "/enhancing-hotels"
        }, {
            name: "Insights",
            slug: "insights",
            pageUrl: "/enhancing-hotels"
        }, {
            name: "Luxury",
            slug: "luxury",
            pageUrl: "/enhancing-hotels"
        }],
    }

    render() {
        return (
            <ContentPage {...this._contentProps} >
                <div id="enhancing-hotels-info" style={ styles.textDivStyle }>
                    SOME CONTENT HERE ABOUT ENHANCING HOTELS
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
                <div id="feedback-info" style={ styles.textDivStyle }>
                    SOME CONTENT ABOUT GETTING FEEDBACK HERE
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div id="insights-info" style={ styles.textDivStyle }>
                    SOME CONTENT ABOUT GETTING INSIGHTS HERE
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
                <div id="luxury-info" style={ styles.textDivStyle } >
                    SOME CONTENT ABOUT HOW THIS WILL INCREASE LUXURY HERE
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
