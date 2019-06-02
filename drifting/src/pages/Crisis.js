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
                    Out of concern for your wellbeing, if you're feeling suicidal or want to self harm, here are some resources that we urge you to reach out to one of the following resources<br />
                    
                    <div className="resources-list">
                    <br /><b>If you are experiencing an emergency<br />Please call 9-1-1 or go to the nearest emergency room</b><br />
                    <br />
                    <b><a href="National Suicide Prevention Lifeline">National Suicide Prevention Lifeline</a></b> 800-273-TALK (8255) <br />
                    <b><a href="https://www.crisisconnections.org/24-hour-crisis-line/">King County 24-Hr Crisis Line</a></b> 206-461-3222<br />

                    <b><a href="http://www.crisistextline.org/">Crisis Text Line</a></b> Text NAMI to 741-741 <br />
                    <br />
                    </div>

                    What you're experiencing right now must be a lot, but there are people who can help you
                    <p>Don't be afraid to reach out to people you know<br /><br />Remember, you are not alone</p>
                    <br />
                    

                    If you're not experiencing an emergency, please go to the following for other mental resources:<br /> [insert link]
                    </div>
                </div>
            </div>

        );
    }
}