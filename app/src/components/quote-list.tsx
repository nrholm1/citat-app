import React, { useEffect, useState } from 'react';
import { quotelist } from '../mockdata';
import Quote from '../models/quote';
import QuoteService from '../services/quote-service';
import QuoteCard from './quote/quote-card';

const createList = (quotes: Quote[]) => {
    let list = quotes.map(q => {
        return (
        <li key={q.ID}>
            <QuoteCard data={q} />
        </li>
        )
    })

    return (<ul> {list} </ul>)
}

function QuoteList() {
    // const quotes: Quote[] = quotelist;
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const getQuotes = async () => {
        let _quotes = (await QuoteService.getAll()).data.Quotes;
        setQuotes(_quotes);
    }

    useEffect(() => {
        if (!loaded) {
            getQuotes();
            setLoaded(true);
        }
    }, [loaded, quotes])
    
    return (
        <div style={{textAlign: "center"}}>
            {
                !loaded ? <h3>Loading...</h3>  : createList(quotes)
            }
        </div>
    )
}

export default QuoteList;