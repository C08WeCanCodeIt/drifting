import React, { Component } from 'react';
/* import logo from './logo.svg';*/
import './Mindfulness.css';



export default class Mindfulness extends Component {
  render() {
    return (
      <div className="mindfulness">

        <div className="stop-box">
          <div className="stop-text">
            <h2>Stop</h2>

            Stop what you are doing and take a moment to listen to your body's reactions
            <br/>
            <br/>
            Check in with what you are thinking and how your body is feeling at this moment
            </div>
        </div>

        <div className="breathe-box">
          <div className="breathe-text">
            <h2>Breathe</h2>

            Clear your thoughts and slowly breath in and breath out for about 30-45 seconds
            <br/> 
            <br />
            Please pay attention to the present moment and stay focused to the end of this activity
            
            </div>
        </div>

        <div className="imagine-box">
          <div className="imagine-text">
            <h2>Imagine</h2>

            Imagine a moment of happiness that makes you feel grateful, proud or just happy
            <br/><br/>
            This can be anything that makes you happy, whether it's from your past or from your future
            </div>
        </div>

      </div>

    );
  }
}
