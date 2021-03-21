import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Quote from '../../models/quote';
import './quote-card.css';
import QuoteService from '../../services/quote-service';
import { Link, useLocation } from 'react-router-dom'

const tempQuote: Quote = {
    ID: -1,
    Name: "placeholder",
    Text: "Loading...",
    Date: "date?",
    Karma: 69
} 

function QuoteCard(props: any) {
    console.log("bruh");
    const path = useLocation();
    const [currentId, setCurrentId] = useState<number>(-1);
    const [data, setData] = useState<Quote>(tempQuote);

    const getQuote = async (id: number) => {
        let quote = (await QuoteService.getById(id)).data;
        console.log(quote);
        setData(quote);
        setCurrentId(quote.ID);
    }

    const getRandomQuote = async () => {
        let quote = (await QuoteService.getRandom()).data;
        setData(quote);
        setCurrentId(quote.ID);
    }

    useEffect(() => {
        console.log(props.data)
        if (props.data !== undefined) {
            setData(props.data);
            console.log("void")
            return 
        }

        let _id = path.pathname.split('/')[2];
        if (_id === "random")
            if (currentId === -1) {
                getRandomQuote()
            }
            else
                getQuote(currentId)
        else
            getQuote(parseInt(_id))
    }, [currentId])

    return (
        <div style={{display: "flex"}}>
            <div className={"karma-heart"}>
                ❤
            </div>
            <div className={"karma"}>
              {data.Karma}
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Said by</th>
                        <th>
                            <Link to={`/quote/${data.ID}`}>Quote {data.ID}</Link>
                        </th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{maxWidth: "50px"}}>
                            { data.Name }
                        </td>
                        <td style={{textAlign: "left", minWidth: "300px", maxWidth: "300px" }}>
                            { data.Text }
                        </td>
                        <td>
                            { data.Date.substring(5,10) + "-" + data.Date.substring(0,4) }
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default QuoteCard;