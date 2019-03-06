import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormControl } from 'react-bootstrap';

export default class ForumSubmission extends Component {
    // Set up a blank title and description input field
    state = {
        title: "",
        description: ""
    };

    // Set the state of title and description are able to change
    change = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    };

    // When the user click submit, the value change on title and description 
    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            title: "",
            description: ""
        })
    };

    render() {
        return (

            // The interface of the input field and submit button
            <form>
            
            <input className="title"
                name="title"
                placeholder="title.."
                value={this.state.title}
                onChange={e => this.change(e)}
            />

            <br />

            <input className="description"
                name="description"
                placeholder="description.."
                value={this.state.description}
                onChange={e => this.change(e)}
            />

            <br />

            <button onClick={e => this.onSubmit(e)}>Submit</button>

            <br />
            
          </form>
        );
    }
}