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
                    <p>Here's what you can do</p>
                    <div className="links-nav">
                        <div className="sublink"><Link to="/processing">Reflect On Emotions</Link></div>
                        <div className="sublink">Express Graditude{/*<Link to="/forum">Express graditude</Link>*/}</div>
                        <div className="sublink"><Link to="/emergency">Get Emergency<br/>Resources</Link></div>
                    </div>

                </div>

            </div>

        );
    }
}