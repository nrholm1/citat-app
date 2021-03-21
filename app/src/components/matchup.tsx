import React, { useEffect, useState } from 'react';
import Quote from '../models/quote';
import QuoteService from '../services/quote-service';
import SimpleQuoteCard from './simple-quote/simple-quote-card';


function MatchupView() {
    const [voted, setVoted] = useState<boolean>(false);

    return (
        <div className={"container"} style={{textAlign: "center"}}>
            <h1>Standoff! 💎 / 💩</h1>
            <SimpleQuoteCard data={{id: 1}} />
            <h1>vs</h1>
            <SimpleQuoteCard data={{id: 2}} />
        </div>
    )
}

export default MatchupView;