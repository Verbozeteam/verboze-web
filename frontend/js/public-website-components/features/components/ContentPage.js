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
    modal_open: boolean,
    width: number,
    height: number,
};


export default class ContentPage extends Component<PropsType, StateType> {
    state = {
        modal_open: false,
        width: 1,
        height: 1,
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({ width: document.documentElement.clientWidth, height: window.innerHeight });
    }

    toggleModal() {
        const { modal_open } = this.state;

        this.setState({
          modal_open: !modal_open
        });
    };

    render() {
        const { banner, sections, title, children } = this.props;
        const { modal_open, width } = this.state;

        var isOnPhone = width <= 992;

        var sidenav = null;
        if (!isOnPhone)
            sidenav = <SideNavBar sections={sections} containerId="content-container" />;

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
                                {sidenav}
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
