import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ExDispose extends Component {
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("main").className = "visible";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for completing the exercise</p>
                    <p>Even if you didn't choose to share your bottle</p>
                    <p>We hope you're able to feel better</p>
                    <br/>
                    <br/>
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>

            </div>

        );
    }
}