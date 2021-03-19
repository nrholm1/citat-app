import React, { useState } from 'react';

import { Table, Button, Form, FormGroup } from 'react-bootstrap';
import QuoteDto from '../models/quoteDto';
import QuoteService from '../services/quote-service';

function CreateEditQuote() {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [quoteText, setQuoteText] = useState<string>();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(name + "\n" + quoteText + "\n" + email);

        if (name === undefined || quoteText === undefined)
            return

        let quoteDto: QuoteDto = {Name: name, Text: quoteText};
        QuoteService.create(quoteDto)
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Name on quote</Form.Label>
                    <Form.Control
                        onChange={e => setName(e.target.value)}
                        type="name" 
                        placeholder="Enter name" />
                    <Form.Text className="text-muted">
                    NOTE: this is the name of person who said the quote
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formQuoteText">
                    <Form.Label>Quote</Form.Label>
                    <Form.Control 
                        onChange={e => setQuoteText(e.target.value)}
                        type="text" 
                        placeholder="Enter Quote" />
                    <Form.Text className="text-muted">
                    En endnu sjovere historie...
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        onChange={e => setEmail(e.target.value)}
                        type="email" 
                        placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    Your email is not visible to anyone.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I am not a robot. (KID does not count)" />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={handleSubmit}
                    >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateEditQuote;