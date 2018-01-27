/* @flow */

import React, { Component } from 'react';

import PageTopBanner from '../PageTopBanner';
import SideNavBar from '../features/components/SideNavBar';
const RequestDemoModal = require('../RequestDemoModal');
const RequestDemoBanner = require('../RequestDemoBanner');
const FeaturesPanels = require('../FeaturesPanels');


type PropsType = {};

type StateType = {
    modal_open: boolean
};


export default class ModernizingControl extends Component<PropsType, StateType> {
    _banner_img = require('../../../assets/images/page_top_banners/banner.png');

    _sections = [
        {
            name: "Modernizing Control",
            slug: "modernizing-control",
            pageUrl: "/modernizing-control"
        },
        {
            name: "In-room Touchscreen",
            slug: "tablet",
            pageUrl: "/modernizing-control"
        },
        {
            name: "Guest's Smartphone",
            slug: "smartphone",
            pageUrl: "/modernizing-control"
        },
        {
            name: "Voice",
            slug: "voice",
            pageUrl: "/modernizing-control"
        },
        {
            name: "Smart Room",
            slug: "smart-room",
            pageUrl: "/modernizing-control",
        }
    ];

    state = {
        modal_open: false
    };

    toggleModal() {
        const { modal_open } = this.state;

        this.setState({
          modal_open: !modal_open
        });
    };

    render() {
        const { modal_open } = this.state;

        return (
            <div>
                <RequestDemoModal open={modal_open}
                    toggle={this.toggleModal.bind(this)} />
                <div style={styles.modernizingControlDivStyle}>
                    <PageTopBanner title="Introducing the Hospitality Industry to the 21st Century" imageUrl={ this._banner_img } />
                    <div className="container" id="modernizing-control-container">
                        <div className="row">
                            <div className="col-md-9">
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
                                    SOME CONTENT ABOUT TABLET HERE
                                    <br/>
                                    <br/>
                                    <br/>

                                    <br/>
                                    <br/>
                                </div>
                                <div id="smartphone-info" style={ styles.textDivStyle }>
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
                                    SOME CONTENT ABOUT TABLET HERE
                                    <br/>
                                    <br/>
                                    <br/>

                                    <br/>
                                    <br/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <SideNavBar sections={ this._sections } containerId="modernizing-control-container" />
                            </div>
                        </div>
                    </div>
                </div>
                <RequestDemoBanner toggleModal={this.toggleModal.bind(this)} />
                <FeaturesPanels expanded={false} />
            </div>
        );
    };
};

const styles = {
    modernizingControlDivStyle: {
        minHeight: '100vh',
        color: 'white',
    },

    textDivStyle: {
        fontWeight: 'lighter',
        paddingTop: 60,
    }
};
