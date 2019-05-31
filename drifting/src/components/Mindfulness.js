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

            Stop what you are doing. Check in with what you are thinking and how you are feeling.
            </div>
        </div>

        <div className="breathe-box">
          <div className="breathe-text">
            <h2>Breathe</h2>

            Practice mindful breathing to create space between your thoughts, emotions and reactions.
            </div>
        </div>

        <div className="think-box">
          <div className="think-text">
            <h2>Think</h2>

            Broaden your perspective, and strengthen your force field of peace with personalized meditations and activities.
            </div>
        </div>

      </div>

    );
  }
}
