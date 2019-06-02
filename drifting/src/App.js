import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
/* import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, Form, FormControl, Container, Image } from 'react-bootstrap'; */
//import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./components/NavBar";

import ForumSubmission from "./pages/ForumSubmission";
import Encouragement from "./pages/Encouragement";

import Forum from "./pages/Forum";
import Explore from "./pages/Explore"
import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import Support from "./pages/Support";
import Crisis from "./pages/Crisis";
import Gratitude from "./pages/Gratitude";
import TermsConditions from "./pages/TermsConditions";


import {EncShare, EncDispose, EPShare, GradShare} from "./pages/Results";





class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <Router basename={process.env.PUBLIC_URL}> */}
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/processing" component={ForumSubmission} />
            <Route path="/encourage" component={Encouragement} />
            <Route path="/gratitude" component={Gratitude} />
            
            <Route path="/support" component={Support} />
            <Route path="/emergency" component={Crisis} />
            <Route path="/excercise" component={Exercise} />
            <Route path="/explore" component={Explore} />
            <Route path="/forum" component={Forum} />

           
            <Route path="/encourage-release" component={EncDispose} />
            <Route path="/encourage-share" component={EncShare} />
            <Route path="/processing-result" component={EPShare} />
            <Route path="/gratitude-result" component={GradShare} />
            <Route path="/TermsConditions" component={TermsConditions} />

          </Switch>
          <footer className="disclaimer">* Drifting was created for educational purposes, our team are not certified mental health professsionals<br/><Link to="/TermsConditions">Terms and Conditions</Link>
          </footer>
      
        </Router>
        </div >

    );
  }
}


export default App;

