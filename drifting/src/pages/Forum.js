import React, { Component } from 'react';
import {Gallery} from "./../components/Gallery";
import './Forum.css';

export default class Great extends Component {
    componentDidMount() {
        setTimeout(function() { //Start the timer
            document.getElementById("forum-holder").className = "visible-t";
        }, 10)
    }


    render() {
        return (
            <div className="container">
                <div id="forum-holder" className="hidden">
                    <Gallery />
                </div>

            </div>

        );
    }
}