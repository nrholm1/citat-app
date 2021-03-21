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
        <div style={{display: "flex"}}>
                <h3 className={"karma-heart"} onClick={() => setVoted(true)}>
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
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td style={{textAlign: "center", minWidth: "100px", maxWidth: "200px" }}>
                            { data.Text }
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default SimpleQuoteCard;