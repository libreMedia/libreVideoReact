import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
  } from 'reactstrap';
import Home from '../Pages/Home'
import MainVid from '../Pages/MainVideoPlayer'

export default function NavBra() {


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    return (
      <Router>
    <div>
        <Container className='nav-container' fluid={true}>
      <Navbar color="prim" expand="md">
        <Container className='nav-container-container' >
        <NavbarBrand href="/"><img id="pics" src="https://i.ibb.co/pbC7mhp/libre-Vid-Trans.png" height="75px" width="150px" alt='Libre Video logo ' /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Nothing ATM
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
    </Container>
      </Navbar>
    </Container>
              <Link to="/rando"></Link>
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/mainVid">
              <MainVid/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }