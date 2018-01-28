/* @flow */

import React, { Component } from 'react';

import SideNavBar from './SideNavBar';
import PageTopBanner from '../../PageTopBanner';
const RequestDemoModal = require('../../RequestDemoModal');
const RequestDemoBanner = require('../../RequestDemoBanner');
const FeaturesPanels = require('../../FeaturesPanels');

type SectionType = {
    name: string,
    url: string,
    slug: string,
};

type PropsType = {
    sections: Array<SectionType>,
    title: string,
    banner: string,
    children?: any,
};

type StateType = {
    modal_open: boolean
};


export default class ContentPage extends Component<PropsType, StateType> {
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
        const { banner, sections, title, children } = this.props;
        const { modal_open } = this.state;

        return (
            <div>
                <RequestDemoModal open={modal_open}
                    toggle={this.toggleModal.bind(this)} />

                <div style={styles.headerDivStyle}>
                    <PageTopBanner title={title} imageUrl={banner} />
                    <div className="container" id="content-container">
                        <div className="row">
                            <div className="col-md-9">
                                {children}
                            </div>
                            <div className="col-md-3">
                                <SideNavBar sections={sections} containerId="content-container" />
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
    headerDivStyle: {
        minHeight: '100vh',
        color: 'white',
    },
};
