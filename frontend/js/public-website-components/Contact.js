/* @flow */

import React, { Component } from 'react';

import {
    Button,
    Segment,
    Container,
    Header,
    Label
} from 'semantic-ui-react';

import {
  Form, Input, TextArea, Checkbox, Radio, RadioGroup, Dropdown, Select,
} from 'formsy-semantic-ui-react';

import * as APITypes from '../api-utils/APITypes';
import { PublicWebsiteAPICaller } from '../api-utils/PublicWebsiteAPI';

import * as Cookies from "js-cookie";

type PropsType = {};

type StateType = {
    /**
     * 0: form not submitted
     * 1: form submitting
     * 2: form submitted
    */
    submitStage: 0 | 1 | 2,
};

type FormData = {
    name: string,
    email: string,
    hotel: string,
    role: string,
    additionalInfo: string
};

export default class Contact extends Component<PropsType, StateType> {
    state = {
        submitStage: 0,
    };

    onKeyPress(event: Event) {
        /* Disable submit by Enter Key */
        if (event.which === 13) {
            event.preventDefault();
        }
    }

    onValidSubmit(formData: FormData) {
        this.setState({submitStage: 1});
        console.log(formData);
        console.log(JSON.stringify(formData));


        var csrftoken = Cookies.get('csrftoken');
        PublicWebsiteAPICaller.setCSRFToken(csrftoken);

        PublicWebsiteAPICaller.contactUs(
            formData,
            ((data: APITypes.ContactUs) => {
                this.setState({submitStage: 2});
                console.log(data);
            }).bind(this),
            ((error: APITypes.ErrorType) => {
                this.setState({submitStage: 0});
                console.log(error);
            }).bind(this)
        );
    }

    render() {
        if (this.state.submitStage == 2) { /* Form submitted */
            return (
                <Segment style={ styles.contactSegment }>
                    <Container>
                        <Header as='h3' style={{ fontSize: '2em', textAlign: 'center' }}>Thank you for submitting your enquiries! We will reach out to you shortly.</Header>
                        <br/>
                    </Container>
                </Segment>
            );
        }
        else {
            return (
                <Segment style={ styles.contactSegment }>
                    <Container>
                        <Header as='h3' style={{ fontSize: '2em', textAlign: 'center' }}>Reach out to us for any questions or enquiries, we're eager to hear from you:</Header>
                        <br/>
                        <Form onValidSubmit={ (formData) => this.onValidSubmit(formData) } onKeyPress={ this.onKeyPress }>
                            <Form.Group widths='equal'>
                                <Form.Field name='Name' control={ Input } label='Your Name' placeholder='Your Name'
                                    validations={{ matchRegexp: /.*\S.*/ }} required />
                                <Form.Field
                                    name='email' control={ Input } label='Your Email' placeholder='Your Email'
                                    validations='isEmail' required/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field name='hotel' control={ Input } label='Your Hotel' placeholder='Your Hotel'
                                    validations={{ matchRegexp: /.*\S.*/ }} required/>
                                <Form.Field name='role' control={ Input } label='Your Role' placeholder='eg: Hotelier | General Manager | Operations | etc...'
                                    validations={{ matchRegexp: /.*\S.*/ }} required/>
                            </Form.Group>
                            <Form.Field name='additionalInfo' control={ TextArea } label='Additional Information' placeholder='(Optional) Any additional information you would like us to know'
                                validations={{ matchRegexp: /.*\S.*/ }} />

                            { this.state.submitStage == 0 ?
                                <Form.Field control={ Button }>Submit</Form.Field> :
                                <Form.Field control={ Button } loading disabled>Submit</Form.Field>
                            }

                        </Form>
                    </Container>
                </Segment>
            );
        }
    }
};


const styles = {
    contactSegment: {
        padding: '8em 0em',
        borderRadius: 0,
        margin: 0
    }
}



