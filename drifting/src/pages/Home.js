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
                            <img src="drifting_logo.png" className="drifting-logo" alt="Drifting" />
                        </a>
                        <br />

                        <div className="home-desc">
                            <p className="hp1">Set your thoughts adrift in a bottle,<br />
                            and free your mind to float<br />
                            </p>
                            <div className="home-desc-sub">
                                <br />
                                <p className="hp2">A platform for helping yourself while helping others</p>
                                <br />
                            </div>
                            <div>
                                <p className="hp3">What do would you like to do?</p>
                                <div className="links-nav">
                                    <div><Link className="navLink" to="/support">Get Support</Link></div>
                                    <div><Link className="navLink" to="/explore">Explore</Link></div>
                                    <div><Link className="navLink" to="/encourage">Offer Support</Link></div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        );
    }
}