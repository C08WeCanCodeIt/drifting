import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Exercise extends Component {
    // Set up a blank title and description input field
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("main").className = "visible";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p className="hp3">What would you like to do? </p>
                    <div id="nav-link">
                        <Link className="list" to="/processing">Reflect On Your Emotions</Link>
                        <Link className="list" to="/encourage">Offer Encouragement</Link>
                        <Link className="list" to="/gratitude">Express Gratitude</Link>
                        <Link className="list" to="/resources">Look at Resources</Link>
                        
                    </div>

                </div>
            </div>
        );
    }
}