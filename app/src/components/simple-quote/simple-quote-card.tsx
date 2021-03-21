import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Quote from '../../models/quote';
import './simple-quote-card.css';
import QuoteService from '../../services/quote-service';
import { Link, useLocation } from 'react-router-dom'

const tempQuote: Quote = {
    ID: -1,
    Name: "placeholder",
    Text: "Loading...",
    Date: "date?",
    Karma: 69
} 

function SimpleQuoteCard(props: any) {
    const [currentId, setCurrentId] = useState<number>(-1);
    const [data, setData] = useState<Quote>(tempQuote);
    const [voted, setVoted] = useState<boolean>(false);

    const getQuote = async (id: number) => {
        let quote = (await QuoteService.getById(id)).data;
        console.log(quote);
        setData(quote);
        setCurrentId(quote.ID);
    }

    useEffect(() => {
        if (props.data !== undefined) {
            setCurrentId(props.data.id)
            getQuote(currentId)
            return 
        }
    }, [currentId, data])

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
                <h3 className={"karma-heart"}>
                        ❤
                </h3>
            {
                voted ? 
                    <div className={"karma"}>
                        {data.Karma}
                    </div>
                :
                    <h3 className={"karma"}>
                        ?
                    </h3>
            }
            <div style={{maxWidth: "300px"}}>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td style={{textAlign: "center"}} onClick={() => setVoted(true)}>
                                { data.Text }
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default SimpleQuoteCard;