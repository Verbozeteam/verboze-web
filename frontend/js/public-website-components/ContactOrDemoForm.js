/* @flow */

import React from 'react';

import * as APITypes from '../js-api-utils/APITypes';
import { PublicWebsiteAPICaller } from '../js-api-utils/PublicWebsiteAPI';

import * as Cookies from 'js-cookie';

import css from '../../css/public_website/ContactOrDemoForm.css';

type PropsType = {
    requestDemo: boolean,
    toggle: () => null
};

type StateType = {
    /**
     * 0: form not submitted
     * 1: form submitting
     * 2: form submitted
     * 3: form error
    */
    submitStage: 0 | 1 | 2 | 3,
};

type FormDataType = {
    name: string,
    email: string,
    hotel: string,
    role: string,
    additionalInfo: string
};

export default class ContactOrDemoForm extends React.Component<PropsType, StateType> {

    state = {
        submitStage: 0
    };

    onKeyPress(event: Event) {
        /* Disable submit by Enter Key */
        if (event.which === 13){
            event.preventDefault();
        }
    }

    onValidSubmit(e: Event) {
        e.preventDefault();
        this.setState({submitStage: 1});
        console.log("submitting");

        var form = document.forms.namedItem("request-demo-form");

        var name = form.elements.namedItem('inputName').value;
        var email = form.elements.namedItem('inputEmail').value;
        var hotel = form.elements.namedItem('inputHotel').value;
        var role = form.elements.namedItem('inputRole').value;
        var additionalInfo = form.elements.namedItem('inputAdditionalInfo').value;

        console.log("name " + name );
        console.log("email " + email);
        console.log("hotel " + hotel);
        console.log("role " + role);
        console.log("inputAdditionalInfo " + additionalInfo);

        var formData = {
            name: name,
            email: email,
            hotel: hotel,
            role: role,
            additionalInfo: additionalInfo,
            requestDemo: this.props.requestDemo
        }

        var csrftoken = Cookies.get('csrftoken');
        PublicWebsiteAPICaller.setCSRFToken(csrftoken);

        PublicWebsiteAPICaller.contactUs(
            formData,
            ((data: APITypes.ContactUs) => {
                this.setState({submitStage: 2});
                console.log(data);
            }).bind(this),
            ((error: APITypes.ErrorType) => {
                this.setState({submitStage: 3});
                // this.setState({errorMessage: error.response.data.error})
                console.log("This is the error");
            }).bind(this)
        );

        return false;
    }

    renderSubmitButton() {
        if (this.state.submitStage === 0) {
            return (
                <button
                    className="btn submit-buttom"
                    onClick={ () => {document.getElementById("submit-form-button").click() }}>
                        REQUEST DEMO
                </button>
            );
        }
        else if (this.state.submitStage === 1) {
            return (
                <button
                    className="btn submit-buttom submitting-form"
                    onClick={ () => {document.getElementById("submit-form-button").click() }}
                    disabled
                >
                    <i className="fa fa-refresh fa-spin fa-fw"></i>
                </button>
            );
        }
    }

    render() {
        if (this.state.submitStage === 2) {
            return (
                <div className={ this.props.requestDemo ? "container request-demo-container" : "container contact-container" } >
                    <h5 style={{ textAlign: 'center' }}>Thank you for submitting your request! We will reach out to you shortly.</h5>
                </div>
            )
        }
        else {
            return (
                <div className={ this.props.requestDemo ? "container request-demo-container" : "container contact-container" } >
                    <form id="request-demo-form-id" name={ this.props.requestDemo ? "request-demo-form" : "contact-form" } onSubmit={(event) => { this.onValidSubmit(event) }} onKeyPress={ (event) => {this.onKeyPress(event) }}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" id="inputName" placeholder="Your Name" name="inputName" required />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="email" className="form-control" id="inputEmail" placeholder="Your Email" name="inputEmail" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" id="inputHotel" placeholder="Your Hotel" name="inputHotel" required />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" id="inputRole" placeholder="Your Role" name="inputRole" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea type="text" className="form-control" id="inputAdditionalInfo" placeholder="(Optional) Any additional information you would like us to know" name="inputAdditionalInfo" />
                        </div>
                        <button type="submit" id="submit-form-button" style={{ display: "none"}}></button>
                    </form>
                    <div style={{overflow: 'hidden'}}>
                      <div className="form-row form-buttons">
                          { this.renderSubmitButton() }
                          <button className="btn cancel-button" onClick={this.props.toggle}>Cancel</button>
                      </div>
                    </div>

              </div>
            );
        }

    }
}
