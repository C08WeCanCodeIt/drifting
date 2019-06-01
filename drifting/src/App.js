import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
/* import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, Form, FormControl, Container, Image } from 'react-bootstrap'; */
//import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { HashRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";


import ForumSubmission from "./pages/ForumSubmission";
import Encouragement from "./pages/Encouragement";

import EPResult from "./pages/EPResult";
import EncResultShare from "./pages/EncResult";
//import EncResultDispose from "./pages/EncResult";
import ExDispose from "./pages/ExDispose";
import Forum from "./pages/Forum";
import Explore from "./pages/Explore"

import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import Support from "./pages/Support";
import Crisis from "./pages/Crisis";




class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <Router basename={process.env.PUBLIC_URL}> */}
        <Router>
          <NavBar />
{/*           <div id="nav-links">
            <Link to="/">Home</Link> | <Link to="/excercise">Exercises</Link> | <Link to="/explore">Explore</Link> | About | Resources | Terms and Conditions
          </div> */}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/processing" component={ForumSubmission} />
            <Route path="/encourage" component={Encouragement} />
            <Route path="/support" component={Support} />
            <Route path="/emergency" component={Crisis} />
            <Route path="/ep_result" component={EPResult} />
            <Route path="/en_result" component={EncResultShare} />
            <Route path="/excercise" component={Exercise} />
            <Route path="/ex_dispose" component={ExDispose} />
            <Route path="/explore" component={Explore} />
            <Route path="/forum" component={Forum} />
          </Switch>
        </Router>
        <footer className="disclaimer">* Drifting was created for educational purposes, our team are not certified mental health professsionals<br/>Terms and Conditions</footer>
      </div >

    );
  }
}


export default App;

