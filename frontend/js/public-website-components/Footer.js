/* @flow */

import React, { Component } from 'react';
import {
    Segment,
    Container,
    Grid,
    Header,
    List,
    Image
} from 'semantic-ui-react'

import { Link } from 'react-router-dom';

import verboze_logo from '../../assets/images/logo_symbol.png';

export const Footer = () => (

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
            <Grid inverted stackable>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Header inverted as='h4' content='Verboze' />
                        <Image as={ Link } to='/' style={{ width: 50 }} src={ verboze_logo } />

                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as={ Link } to='/about-us'>Contact Us</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Features' />
                        <List link inverted>
                            <List.Item as={ Link } to='/features'>Retrofitting</List.Item>
                            <List.Item as={ Link } to='/features'>Control</List.Item>
                            <List.Item as={ Link } to='/features'>Monitoring</List.Item>
                        </List>
                    </Grid.Column>

                    <Grid.Column width={5} floated='right' textAlign='right' >
                        <Header inverted as='h5'>
                            © { new Date().getFullYear() } Verboze. All rights reserved.

                        </Header>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </Container>
    </Segment>

);
