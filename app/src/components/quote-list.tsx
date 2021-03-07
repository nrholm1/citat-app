import React from 'react';
import { quotelist } from '../mockdata';
import Quote from '../models/quote';
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
    const quotes: Quote[] = quotelist;
    
    return (
        <div style={{textAlign: "center"}}>
            {
               createList(quotes)
            }
        </div>
    )
}

export default QuoteList;