import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
                <div className="header">
                    <p className="header-text">
                        Emergency Resources
                    </p>
                </div>
                <div id="emergency" className="hidden">

                    <div className="text-long">
                        Out of concern for your wellbeing, if you're feeling suicidal or want to self harm, here are some resources that we urge you to reach out to one of the following resources<br />

                        <div className="resources-list">
                            <br /><label>If you are experiencing an emergency<br />Please call 911 or go to the nearest emergency room</label><br /><br />
                        </div>

                        What you're experiencing right now must be a lot, but there are people who can help you. Don't be afraid to reach out to people you know.<br /><br />

                        <div className="resources-list">
                            <p>Remember, you are not alone</p>
                            <br />

                            <table>
                                <tbody>
                                    <tr>
                                        <td><a href="http://suicidepreventionlifeline.org/">National Suicide Prevention Lifeline</a></td>
                                        <td>Call 800-273-8255</td>
                                    </tr>
                                    <tr>
                                        <td><a href="https://www.crisisconnections.org/24-hour-crisis-line/">King County 24-Hr Crisis Line</a></td>
                                        <td>Call 206-461-3222</td>
                                    </tr>
                                    <tr>
                                        <td><a href="http://www.crisistextline.org/">Crisis Text Line</a></td>
                                        <td>Text NAMI to 741-741</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <p>If you're not experiencing an emergency, please go to the <Link to="/resources" >Resources </Link> page for more information</p>

                        </div>








                    </div>
                </div>
            </div>

        );
    }
}