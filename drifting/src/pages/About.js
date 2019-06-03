import React, { Component } from 'react';

export default class About extends Component {
    // Set up a blank title and description input field
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("resources").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <p className="header-text">
                        About
                    </p>
                </div>
                <div id="resources" className="hidden">

                    <div className="text-long">

                        <p>College students face a wide range of stressful situations that can be difficult to navigate alone. Our web app, Drifting, provides guided exercises— for processing difficult emotions or providing encouragement— and a forum to see other’s thoughts for similar situations.</p>

                        <p>Inspired by the concept of the message in the bottle, where people can anonymously release their secrets to the sea, we offer a safe place for students to confide in their troubles, to support each other, and to promote healthier mental wellbeing.</p>
                        <br />
                        <br />
                        <div className="resources-list">
                            <b>Our Team</b>
                            <p>Our team consists of four students from the University of Washington iSchool program</p>

                            <div className="contacts">
                                <div className="person">
                                    <b>Kathy Chiu (Developer)</b><br />
                                    chiuy5@uw.edu
                                </div>
                                <div className="person">
                                    <b>Natsnet Demoz (Developer)</b><br />
                                    demozn@uw.edu
                                </div>
                                <div className="person">
                                    <b>Thea Tai (Developer)</b><br />
                                    thea330@uw.edu
                                </div>
                                <div className="person">
                                    <b>Sylvia Wu (Designer/Developer)</b><br />
                                    xilinw@uw.edu
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>

                        <div className="resources-list">
                            <b>Acknowledgments</b>
                            <p>We would like to thank the following for supporting us while developing Drifting</p><br />
                            <b>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Candace Faber</td>
                                        <td>Dr. Jaclyn Lally</td>
                                        <td>Jaime Snyder</td>
                                    </tr>
                                    <tr>
                                        <td>Dr. Treg Isaacson</td>
                                        <td>Paritosh Bapat</td>
                                    </tr>
                                </tbody>
                            </table>
                            </b>
                            <br />
                            <p>And our friends, family, and those from the iSchool</p>
                            <img className="ischool-logo" src="https://s3.amazonaws.com/ByC_logo_prod/unit-29166.png"></img>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}