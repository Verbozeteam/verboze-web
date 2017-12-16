/* @flow */

import React, { Component } from 'react';
import {
    Header,
    Image,
    Card,
    Icon,
    Segment,
    Grid,
    Container,
    Embed
} from 'semantic-ui-react';

type PropsType = {
};

type StateType = {
};

export default class AboutUs extends Component<PropsType, StateType> {
    _yusuf = require('../../assets/images/yusuf.png');
    _hasan = require('../../assets/images/hasan.png');
    _fituri = require('../../assets/images/fituri.jpg');
    // _qstp = require('../../assets/images/qstp.jpg');

    render() {
        return (
            <div>
                <Segment style={ styles.teamSegment }>
                    <Container>
                        <Grid textAlign='center' columns={3} stackable>
                            <Header as='h3' style={{ fontSize: '2em' }}>Team</Header>
                            <br/>
                            <Grid.Row>
                                <Grid.Column>
                                    <Card style={ styles.hasanCard }>
                                        <Image src={ this._hasan } />
                                        <Card.Content>
                                            <Card.Header>
                                                Hasan Al-Jawaheri
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='date'>
                                                    Co-Founder&nbsp;&nbsp;|&nbsp;&nbsp;CEO&nbsp;&nbsp;|&nbsp;&nbsp;Systems Engineer
                                                </span>
                                            </Card.Meta>
                                            <Card.Description>
                                                Computer Science and Business Administration from Carnegie Mellon University
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='mail' />
                                            hbj@verboze.com
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>

                                <Grid.Column>
                                    <Card style={ styles.fituriCard }>
                                        <Image src={ this._fituri } />
                                        <Card.Content>
                                            <Card.Header>
                                                Mohammed M. Fituri
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='date'>
                                                    Co-Founder&nbsp;&nbsp;|&nbsp;&nbsp;Mobile&nbsp;&nbsp;|&nbsp;&nbsp;Design
                                                </span>
                                            </Card.Meta>
                                            <Card.Description>
                                                Computer Science and Information Systems from Carnegie Mellon University
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='mail' />
                                            mfituri@verboze.com
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>

                                <Grid.Column>
                                    <Card style={ styles.yusufCard }>
                                        <Image src={ this._yusuf } />
                                        <Card.Content>
                                            <Card.Header>
                                                Yusuf Musleh
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='date'>
                                                    Co-Founder&nbsp;&nbsp;|&nbsp;&nbsp;Backend&nbsp;&nbsp;|&nbsp;&nbsp;Web
                                                </span>
                                            </Card.Meta>
                                            <Card.Description>
                                                Computer Science and Business Administration from Carnegie Mellon University
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Icon name='mail' />
                                            ymusleh@verboze.com
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>

                <Segment inverted style={ styles.locationSegment }>
                    <Container>
                        <Grid textAlign='center' columns={2} stackable>
                            <Grid.Row>
                                <Header inverted as='h3' style={{ fontSize: '2em' }}>Location</Header>
                                <br/>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div style={ styles.qstpImage }></div>
                                </Grid.Column>
                                <Grid.Column>
                                    <Embed
                                        style={ styles.embededMap }
                                        active={true}
                                        url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3732234493864!2d51.435260451148345!3d25.325254183757377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dc1b48888243%3A0xc99991c5589f3b25!2sQatar+Science+and+Technology+Park!5e0!3m2!1sen!2sus!4v1486423672733'
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Header inverted as='h5' style={{ fontSize: '1em' }}>
                                    Qatar Science & Technology Park is a home for international technology companies in Qatar,
                                    and an incubator of start-up technology businesses.
                                </Header>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>

            </div>
        );
    };
};


const styles = {
    teamSegment: {
        padding: '8em 0em',
        borderRadius: 0,
        margin: 0
    },
    hasanCard: {
        height: '100%'
    },
    fituriCard: {
        height: '100%',
        margin: 'auto'
    },
    yusufCard: {
        height: '100%',
        float: 'right'
    },
    locationSegment: {
        padding: '8em 0em',
        borderRadius: 0,
        margin: 0
    },
    qstpImage: {
        backgroundImage: 'url(\'' + require('../../assets/images/qstp.jpg') + '\')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'calc(50% + 13px) 50%',
        height: '100%'
    },
    embededMap : {
        borderRadius: '.3125em'
    }

}