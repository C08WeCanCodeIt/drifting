import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ForumSubmission from "./ForumSubmission";
import Forum from "./Forum";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, Form, FormControl, Container, Image } from 'react-bootstrap';

class App extends Component {
  state = {
    fields: {}
  };

  onSubmit = fields => {
    this.setState({ fields });
  };

  render() {
    return (
      <div className="App">

        {/* We might use nav bar, I am just saving the code for later */}

        {/* <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#Forum">Forum</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar> */}

        <header className="App-header">
          <Image src="drifting-logo.jpg" className="drifting-logo" />
        </header>
        
        {/* Trying to create a container and make a new page */}

        <Container className="forumSubmission">
          <ForumSubmission onSubmit={fields => this.onSubmit(fields)} />

        </Container>

      </div>
    );
  }
}

export default App;
