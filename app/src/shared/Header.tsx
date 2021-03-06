import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function Header() {
    const element = (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/"><h1>Citat App 🤡</h1></Navbar.Brand>
                <Nav className="mr-auto" style={{fontSize: 24}}>
                    <Nav.Link href="/">Quote List</Nav.Link>
                    <Nav.Link href="/quote/random">Random Quote</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
    return element;
}

export default Header;