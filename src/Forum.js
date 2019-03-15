import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, FormControl, FormCheck } from 'react-bootstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import ForumSubmission from './ForumSubmission';

export default class Forum extends Component {
    constructor(props) {
        super(props);

    }

    displayMessage(event) {
        event.preventDefault();

        console.log("message", this.state.message);

        fetch("https://api.kychiu.me/v1/ocean/ocean", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
        }).then(res => {
            return res.json();
        }).then((data) => {
            this.setState({
                message: data
            })
        }).catch((err, data) => {
            console.log(err);
            console.log("message", data);
        });
    }

    render() {
        return (
            <div>
                <Card body inverse style={{ backgroundColor: '#b3d2e5' }}>
                    <CardBody ref={message => this.state.message = message}>
                        Here's your process of emotion:
    
                        {this.state.message}

                    </CardBody>
                </Card>

                <form onSubmit={this.displayMessage}>
                    <button className="btn btn-primary mr-2">
                        Okay
                    </button>
                </form>
            
            </div>
        )
    }
}