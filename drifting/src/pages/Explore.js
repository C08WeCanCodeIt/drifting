import React, { Component } from 'react';
/*import { Link } from "react-router-dom";*/

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
                    <p>You’re about to go exploring different bottles<br/>
                    Some of these bottles can contain serious topics<br />
                    Would you like to look at</p>
                    <br />
                    <div className="links-nav">
                        <div className="sublink">Encouragement<br/>Bottles Only</div>
                        <div className="sublink">Reflection<br/>Bottles Only</div>
                        <div className="sublink">All Bottles</div>
                    </div>

                </div>

            </div>

        );
    }
}