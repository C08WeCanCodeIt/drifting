import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class EPResult extends Component {
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for completing the exercise</p>
                    <p>Expressing your thoughts is a big step for taking care of yourself</p>
                    <p>Remember, it'll be alright</p>
                    <br />
                    <br />
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>
            </div>
        );
    }
}