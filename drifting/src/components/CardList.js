import React, { Component } from 'react';
import { MoodCard } from './MoodCard.js';

export class CardList extends Component{
    //constructor(props) {
    //    super(props);  
    //}

        // Function for submit and display the user input message
    //displayMessage(event) {
        //event.preventDefault();
        //let message = {}
        //this.setState({
        //    message: this.state.body
        //}
                // }, () => {
                //     console.log("message", this.state.message);
        //}
    
        //fetch("https://api.kychiu.me/v1/ocean/ocean", {
        //    method: "GET",
        //    headers: {
        //        "Content-Type": "application/json"
        //    },
        //}).then(res => {
        //    return res.json();
        //}).then((data) => {
    
        //    this.setState({
        //        message: data
    //
        //    })
    
        //}).catch((err, data) => {
        //    console.log(err);
         //   console.log("message1", data);
        //});
    
    //}

    render() {
        //console.log("test", this.props.bottles);
        let bottles = this.props.bottles;
        //console.log("bottles", bottles)
        //let type = this.props.type == "personal";
        //if (type) {
        //    cards = cards.filter((d) => {
        //        return d.user == this.props.user
        //    })
       // } else {
       //     cards = cards.filter((d) => {
        //        return d.user != this.props.user
        //    })
        //}
        return (
            <div className="row">
                {bottles.map((d, i) => {
                    return <MoodCard bottle={ d } key={"item=" + i}/>
                })}
            </div>
        )
    }
}