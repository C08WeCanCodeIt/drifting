import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class EncResultShare extends Component {
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for sharing</p>
                    <p>Your encouragement will make difference to someone</p>
                    <br/>
                    <br/>
                    <br/>
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>

            </div>

        );
    }
}

export default class EncResultDispose extends Component {
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for sharing</p>
                    <p>Your encouragement will make difference to someone</p>
                    <br/>
                    <br/>
                    <br/>
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>

            </div>

        );
    }
}