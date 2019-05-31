import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Home extends Component {

    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("front").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div className="homepage">
                    <div id="front" className="hidden">
                        <a href="./">
                            <img src="drifting_logo.png" className="drifting-logo" alt="Drifting" /></a><br />

                            <div className="home-desc">
                            Set your thoughts adrift in a bottle,<br />
                            and free your mind to float<br />
                            <div className="home-desc-sub">
                            <br />
                            <p><i>A platform for individual and peer support in non-emergencies</i></p>
                            <br />
                            </div>
                            </div>

                        <div>
                            <p>What do would you like to do?</p>
                            <div className="links-nav">
                                <div><Link to="/support">Get Support</Link></div>
                                <div><Link to="/explore">Explore</Link></div>
                                <div><Link to="/encourage">Offer Support</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}