import React, { Component } from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, FormControl, FormCheck } from 'react-bootstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import Forum from './Forum';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ForumSubmission extends Component {
    // Set up a blank title and description input field
    constructor(props) {
        super(props);
        this.state = {
            emotion: "",
            exercise: "",
            body: ["", "", "", "", "", "", ""],
            tags: "",
            isPublic: true,
        };

        this.displayMessage = this.displayMessage.bind(this);

        //this.handleChange = this.handleChange.bind(this);
        //this.postBottle = this.postBottle.bind(this);
    }

    // Add a method to handle changes to any input element
    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        console.log(field, value);
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    handleQuestion(event) {
        let index = event.target.name;
        let value = event.target.value;
        console.log(index, value);
        let change = this.state.body;
        change[index] = value;
        this.setState({ body: change }, () => {
            console.log("body", this.state.body);
        });
    }

    // Function for submit and display the user input message
    displayMessage(event) {
        event.preventDefault();
        let message = {}
        this.setState({
            message: this.state.body
        }
            // }, () => {
            //     console.log("message", this.state.message);
        )

        fetch("https://api.kychiu.me/v1/ocean/ocean", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            return res.text();
        }).then((data) => {

            this.setState({
                message: data

            })

        }).catch((err, data) => {
            console.log(err);
            console.log("message1", data);
        });

    }


    // When the user click submit, the value change on title and description 
    //onSubmit = e => {
    //    e.preventDefault();
    //    this.props.onSubmit(this.state);
    //    this.setState({
    //        title: "",
    //        description: ""
    //    })
    //};
    /*
        addBottle() {
            console.log(this.state.isPublic);
            let bottle = {
                emotion: this.state.emotion,
                exercise: this.state.exercise,
                body: this.state.body,
                tags: this.state.tags,
                isPublic: this.state.isPublic,
            }
    
            console.log(bottle);
    
            fetch("https://api.kychiu.me/v1/ocean/ocean", {
                method: "POST",
                body: 
                    {emotion: this.state.emotion,
                        exercise: this.state.exercise,
                        body: this.state.body,
                        tags: this.state.tags,
                        isPublic: this.state.isPublic
                    }
            }).then(res => {
                return res.json();
            }).then((data) => {
                console.log("bottle1", data);
                this.clearState();
            }).catch((err, data) => {
                console.log(err);
                console.log("bottle2", data);
            });
    
    
            
            //this.cardsRef.push(card);    
        }
    }*/

    addBottle = (e) => {
        /*console.log(this.state.isPublic);
        let bottle = {
            emotion: this.state.emotion,
            exercise: this.state.exercise,
            body: this.state.body,
            tags: this.state.tags,
            isPublic: this.state.isPublic,
        }*/

        //console.log(bottle);
        e.preventDefault();
        fetch("https://api.kychiu.me/v1/ocean/ocean", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    emotion: this.state.emotion,
                    exercise: this.state.exercise,
                    body: this.state.body,
                    tags: this.state.tags,
                    isPublic: this.state.isPublic
                })
        }).then(res => {
            return res.json();
        }).then((data) => {
            console.log("bottle1", data);
            this.clearState();
        }).catch((err, data) => {
            console.log(err);
            console.log("bottle2", data);
        });
    }

    clearState() {
        this.setState({
            emotion: "",
            exercise: "",
            body: ["", "", "", "", "", "", ""],
            tags: "",
            isPublic: ""
        }, () => {
            console.log("empty", this.state);
        });

    }

    postBottle() {
        //this.setState({type: "public"});
        this.setState(
            { isPublic: true },
            () => {
                console.log("post", this.state);
                this.addBottle();
            }
        );
    }

    saveBottle = (e) => {
        e.preventDefault();
        this.setState(
            { isPublic: false },
            () => {
                console.log("save", this.state);
                //this.addBottle();
                fetch("https://api.kychiu.me/v1/ocean/ocean", {
                    method: "POST",
                    body:
                    {
                        emotion: this.state.emotion,
                        exercise: this.state.exercise,
                        body: this.state.body,
                        tags: this.state.tags,
                        isPublic: this.state.isPublic
                    }
                }).then(res => {
                    return res.json();
                }).then((data) => {
                    console.log("bottle1", data);
                    this.clearState();
                }).catch((err, data) => {
                    console.log(err);
                    console.log("bottle2", data);
                });
            }
        );
    }

    disposeBottle() {
        this.clearState();
    }

    render() {
        return (
            <div className="container">
                <div className="intro">
                    <h1>Create a New Bottle</h1>
                    <h2>How are you feeling right now?</h2>
                </div>
                <form>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-secondary">
                            <input type="radio"
                                name="emotion"
                                value="+2"
                                checked={this.state.emotion === "+2"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                            Great
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio"
                                name="emotion"
                                value="+1"
                                checked={this.state.emotion === "+1"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                            Good
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio"
                                name="emotion"
                                value="0"
                                checked={this.state.emotion === "0"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                            Okay
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio"
                                name="emotion"
                                value="-1"
                                checked={this.state.emotion === "-1"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                            Bad
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio"
                                name="emotion"
                                value="-2"
                                checked={this.state.emotion === "-2"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                            Awful
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">What happend?</label>
                        <textarea className="form-control"
                            name="0"
                            value={this.state.body[0]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder=""
                            aria-label="some description texts">
                        </textarea>
                    </div>
{/* 
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">How are you feeling?</label>
                        <textarea className="form-control"
                            name="1"
                            value={this.state.body[1]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            aria-label="some description texts">
                        </textarea>
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Could the situation be worse than it is? And how so?</label>
                        <textarea className="form-control"
                            name="2"
                            value={this.state.body[2]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            aria-label="some description texts">
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">What are some factors that contributed to the situation?</label>
                        <textarea className="form-control"
                            name="3"
                            value={this.state.body[3]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            aria-label="some description texts">
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">What factors in the situation are in your control?</label>
                        <textarea className="form-control"
                            name="4"
                            value={this.state.body[4]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            aria-label="some description texts">
                        </textarea>
                    </div>
                    
                    <br />
                    <p> [ ** Will add a Mindfulness exercise ** ]</p>
                    <br />

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Can you brainstorm solutions you can do to address your situation?</label>
                        <textarea className="form-control"
                            name="5"
                            value={this.state.body[5]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            aria-label="some description texts">
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">How do you feel now?</label>
                        <textarea className="form-control"
                            name="6"
                            value={this.state.body[6]}
                            onChange={(event) => { this.handleQuestion(event) }}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            aria-label="some description texts">
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Tags</label>
                        <input type="text" className="form-control"
                            name="tags"
                            value={this.state.tags}
                            onChange={(event) => { this.handleChange(event) }}
                            id="formGroupExampleInput"
                            placeholder="Tags for your bottle"
                            aria-label="Tags for your bottle"
                        />
                    </div>
                </form>

                <button className="btn btn-primary mr-2" onClick={(e) => this.addBottle(e)}>
                    Public
                </button>
                <button className="btn btn-primary mr-2" onClick={(e) => this.saveBottle(e)}>
                    Only I Can See
                </button>
                <button className="btn btn-primary mr-2" onClick={() => this.disposeBottle()}>
                    Dispose
                </button>
            </div>

        );
    }
}