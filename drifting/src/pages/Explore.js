import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Support extends Component {
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <br />
                    <p>You’re about to go exploring others' bottles<br />
                        Some of these bottles can contain sensitive topics<br /><br/>
                        Please remember to be kind and respectful, as this is a safe space<br />
                        {/* Would you like to look at */}</p>
                    <br />

                    <Link to="/forum">Continue</Link>

                    {/*<div className="links-nav">
                        /*                        <div className="sublink">Encouragement<br/>Bottles Only</div>
                        <div className="sublink">Reflection<br/>Bottles Only</div>
                        <div className="sublink"><Link to="/forum">Continue</Link></div>
                    </div>*/}

                </div>

            </div>

        );
    }
}