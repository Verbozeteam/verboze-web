/* @flow */

import React, { Component } from 'react';

import PageTopBanner from '../PageTopBanner';
import SideNavBar from '../features/components/sideNavBar'
const FeaturesPanels = require('../FeaturesPanels');


type PropsType = {};

type StateType = {};


export default class EnhancingHotels extends Component<PropsType, StateType> {
    _banner_img = require('../../../assets/images/page_top_banners/banner.png');

    _sections = [
        {
            name: "Enhancing Hotels",
            slug: "enhancing-hotels",
            pageUrl: "/enhancing-hotels"
        },
        {
            name: "Feedback",
            slug: "feedback",
            pageUrl: "/enhancing-hotels"
        },
        {
            name: "Insights",
            slug: "insights",
            pageUrl: "/enhancing-hotels"
        },
        {
            name: "Luxury",
            slug: "luxury",
            pageUrl: "/enhancing-hotels"
        },
    ];

    render() {
        return (
            <div>
                <div style={styles.enhancingHotelsDiv}>
                    <PageTopBanner title="Enhancing Hotels is our middle name, let us take care of it for You" imageUrl={ this._banner_img } />
                    <SideNavBar sections={ this._sections } containerId="enhancing-hotels-container" />
                    <div className="container" id="enhancing-hotels-container">
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
                    </div>
                </div>
                <FeaturesPanels expanded={false} />
            </div>
        );
    };
};

const styles = {
    enhancingHotelsDiv: {
        minHeight: '100vh',
        background: 'black',
        color: 'white',
    },

    textDivStyle: {
        paddingTop: 60
    }
};
