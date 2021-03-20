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

enum VoteState {
    NO, 
    UP, 
    DOWN 
}

function QuoteCard(props: any) {
    console.log("bruh");
    const path = useLocation();
    const [currentId, setCurrentId] = useState<number>(-1);
    const [voted, setVoted] = useState<VoteState>(VoteState.NO)
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

    const upvote = () => {
        if (voted === VoteState.NO) {
            QuoteService.upvote(data.ID);
            setVoted(VoteState.UP);
        }
        else if (voted === VoteState.DOWN) {
            // lazy method: upvote twice to cancel out old downvote
            QuoteService.upvote(data.ID);
            QuoteService.upvote(data.ID);
            setVoted(VoteState.UP);
        }
        else if (voted === VoteState.UP) {
            // lazy method: downvote to cancel out old upvote
            QuoteService.downvote(data.ID);
            setVoted(VoteState.NO);
        }
        // update karma ??
    }

    const downvote = () => {
        if (voted === VoteState.NO) {
            QuoteService.downvote(data.ID);
            setVoted(VoteState.DOWN);
        }
        else if (voted === VoteState.UP) {
            // lazy method: downvote twice to cancel out old upvote
            QuoteService.downvote(data.ID);
            QuoteService.downvote(data.ID);
            setVoted(VoteState.DOWN);
        }
        else if (voted === VoteState.DOWN) {
            // lazy method: downvote to cancel out old upvote
            QuoteService.upvote(data.ID);
            setVoted(VoteState.NO);
        }
        // update karma ??
    }

    return (
        <div style={{display: "flex"}}>
            <div className={"karma"}>
                {data.Karma}
            </div>
            <table className={"vote-btn"}>
                <thead>
                    <th>
                        <Button active={voted === VoteState.UP} 
                                onClick={() => upvote()} 
                                variant="success">↑</Button>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <Button active={voted === VoteState.DOWN} 
                                onClick={() => downvote()} 
                                variant="danger">↓</Button>
                    </tr>
                </tbody>
            </table>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
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