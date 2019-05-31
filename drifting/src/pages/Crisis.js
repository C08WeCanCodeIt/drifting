import React, { Component } from 'react';

export default class Crisis extends Component {
    // Set up a blank title and description input field
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <div className="text-long">
                    Out of concern for your wellbeing,<br/>if you are experiencing an emergency,<br />Please call 9-1-1 or go to the nearest emergency room<br /><br />What your experiencing right now must be a lot,<br />but there are people who want to help you
                    <br />
                    <br />
                    <br />
                    Remember,
                    <p>Don't be afraid to reach out to people you know. <br />You are not alone.</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    </div>
                </div>
            </div>

        );
    }
}