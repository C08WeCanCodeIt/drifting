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
                    Out of concern for your wellbeing, if you're feeling suicidal or want to self harm<br/>
                    Please contact [...]<br />
                    
                    <br />If you are facing an emergency<br />Please call 9-1-1 or go to the nearest emergency room<br />
                    
                    What you're experiencing right now must be a lot,<br />but there are people who can help you
                    <p>Don't be afraid to reach out to people you know<br /><br />You are not alone</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    If you're not facing an emergency, you can find other mental resources here: [insert link]
                    </div>
                </div>
            </div>

        );
    }
}