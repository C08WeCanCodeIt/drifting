import React, { Component } from 'react';
import { Link } from "react-router-dom";


export class EncShare extends Component {
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for taking your time to write an encouragement</p>
                    <p>Your encouragement will make difference to someone</p>
                    <br />
                    <div className="bottleholder">
                        <img src="floating bottle.png" className="floating-bottle" alt="floating bottle" />
                    </div>
                    <br />
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>

            </div>

        );
    }
}

export class EncDispose extends Component {
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }

    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for taking your time to write an encouragement</p>
                    <p>We hope that writing the encouragement was an pleasent experience for you</p>
                    <br />
                    <div className="bottleholder">
                        <img src="floating bottle.png" className="floating-bottle" alt="floating bottle" />
                    </div>
                    <br />
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>

            </div>

        );
    }
}


export class EPShare extends Component {
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for taking your time to reflect on your emotions</p>
                    <p>Expressing your thoughts is a big step for taking care of yourself</p>
                    <p>Remember, it'll be alright</p>

                    <div className="bottleholder">
                        <img src="floating bottle.png" className="floating-bottle" alt="floating bottle" />
                    </div>
                    <br />
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>
            </div>
        );
    }
}

export class GradShare extends Component {
    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <p>Thank you for taking your time to express what you're grateful for</p>
                    <p>We hope that it was a pleasent exprience for you</p>
                    <p>Remember, it'll be alright</p>
                    <div className="bottleholder">
                        <img src="floating bottle.png" className="floating-bottle" alt="floating bottle" />
                    </div>
                    <br />
                    <div><Link to="/explore">Take some time and explore other's bottles</Link></div>
                </div>
            </div>
        );
    }
}