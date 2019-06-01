import React, { Component } from 'react';

export default class Crisis extends Component {
    // Set up a blank title and description input field
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("emergency").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="emergency" className="hidden">
                    <div className="text-long">
                    Out of concern for your wellbeing, if you're feeling suicidal or want to self harm, please contact:<br /> [...]<br />
                    
                    <br />If you are experiencing an emergency<br />Please call 9-1-1 or go to the nearest emergency room<br />
                    
                    What you're experiencing right now must be a lot,<br />but there are people who can help you
                    <p>Don't be afraid to reach out to people you know<br /><br />Remember, you are not alone</p>
                    <br />

                    If you're not experiencing an emergency, please go to the following for other mental resources:<br /> [insert link]
                    </div>
                </div>
            </div>

        );
    }
}