import React, { Component } from 'react';
import {Gallery} from "./../components/Gallery";


export default class Great extends Component {
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("main").className = "visible-t";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="main" className="hidden">
                    <Gallery />
                </div>

            </div>

        );
    }
}