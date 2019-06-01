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
                    What would you like to do?
                    <br />
                    <br />
                    <div id="nav-link">
                        <Link to="/processing">Reflect On Emotions</Link><br />
                        <Link to="/encourage">Offer Encouragement</Link><br />
                        <Link to="/gratitude">Express Gratitude</Link><br />
                        Look at Resources<br />
                    </div>

                </div>
            </div>
        );
    }
}