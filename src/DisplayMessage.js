import React, { Component } from 'react';
import './App.css';
// import { Button, Form, FormControl } from 'react-bootstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import ForumSubmission from './ForumSubmission';

class DisplayMessage extends ForumSubmission {

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>
                            What happened?
                        </CardTitle>
                        <CardText>
                            {this.state.body[0]}
                        </CardText>

                        <CardTitle>
                            How are you feeling?
                        </CardTitle>
                        <CardText>
                            {this.state.body[1]}
                        </CardText>

                        <CardTitle>
                            Can the situation be worse? How?
                        </CardTitle>
                        <CardText>
                            {this.state.body[2]}
                        </CardText>

                        <CardTitle>
                            What are some factors that contributed to the situation?
                        </CardTitle>
                        <CardText>
                            {this.state.body[3]}
                        </CardText>

                        <CardTitle>
                            What factors in the situation is in your control?
                        </CardTitle>
                        <CardText>
                            {this.state.body[4]}
                        </CardText>

                        <CardTitle>
                            Can you brainstorm solutions you can do to address your situation?
                        </CardTitle>
                        <CardText>
                            {this.state.body[5]}
                        </CardText>

                        <CardTitle>
                            How do you feel now?
                        </CardTitle>
                        <CardText>
                            {this.state.body[6]}
                        </CardText>

                    </CardBody>
                </Card>
            </div>
        )
    }
}


