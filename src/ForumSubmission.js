import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormControl } from 'react-bootstrap';

export default class ForumSubmission extends Component {
    // Set up a blank title and description input field
    constructor(props) {
        super(props);
        this.state = {
            mood: "",
            body: "",
            type: "",
            tags: ""
        };    
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

    // When the user click submit, the value change on title and description 
    //onSubmit = e => {
    //    e.preventDefault();
    //    this.props.onSubmit(this.state);
    //    this.setState({
    //        title: "",
    //        description: ""
    //    })
    //};

    addBottle() {
        console.log(this.state.type);
        let bottle = {
            mood: this.state.mood,
            body: this.state.body,
            type: this.state.type,
            tags: this.state.tags,
                
        }
        console.log("bottle", bottle);
        //this.cardsRef.push(card);    
    }

    clearState() {
        this.setState({
            mood: "",
            body: "",
            type: "",
            tags: ""}, () => {
            console.log("empty", this.state);
        });
        
    }

    postBottle() {
        //this.setState({type: "public"});
        this.setState(
            {type: "public"}, 
            () => {
                console.log("post", this.state);
                this.addBottle();
                this.clearState();
            }
        );
    }

    saveBottle() {
        this.setState(
            {type: "private"}, 
            () => {
                console.log("save", this.state);
                this.addBottle();
                this.clearState();
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
                    <div className="radio">
                        <label>
                            <input type="radio" 
                                name="mood"
                                value="happy"
                                checked={this.state.mood==="happy"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                        Happy
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" 
                                name="mood"
                                value="bad"
                                checked={this.state.mood==="bad"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                        Bad
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" 
                                name="mood"
                                value="awful"
                                checked={this.state.mood==="awful"}
                                onChange={(event) => { this.handleChange(event) }}
                            />
                        Awful
                        </label>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Emotional Processing</label>
                      <textarea className="form-control"
                        name="body"
                        value={this.state.body}
                        onChange={(event) => { this.handleChange(event) }} 
                        id="exampleFormControlTextarea1" 
                        rows="3"
                        placeholder="What happened?"
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
                <button className="btn btn-primary mr-2" onClick={() => this.postBottle()}>
                    Post
                </button>
                <button className="btn btn-primary mr-2" onClick={() => this.saveBottle()}>
                    Save
                </button>
                <button className="btn btn-primary mr-2" onClick={() => this.disposeBottle()}>
                    Dispose
                </button>
            </div>
        );
    }
}