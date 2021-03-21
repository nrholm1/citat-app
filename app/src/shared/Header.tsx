import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
    const element = (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/"><h1>Citat App 🤡</h1></Navbar.Brand>
                <Nav className="mr-auto" style={{fontSize: 24}}>
                    <Nav.Link href="/create-edit">New Quote</Nav.Link>
                    <Nav.Link href="/">Quote List</Nav.Link>
                    <Nav.Link href="/quote/random">Random Quote</Nav.Link>
                    <Nav.Link href="/matchup">Krid eller kran 🏗</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search quote" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    <Nav.Link href="/login" style={{fontSize: 24}}>Log in</Nav.Link>
                </Form>
            </Navbar>
        </div>
    );
    return element;
}

export default Header;