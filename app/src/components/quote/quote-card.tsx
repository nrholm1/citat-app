import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Quote from '../../models/quote';
import './quote-card.css';
import QuoteService from '../../services/quote-service';
import { useLocation } from 'react-router-dom'

enum VoteState {
    NO, 
    UP, 
    DOWN 
}

function QuoteCard(props: any) {
    console.log("bruh");
    let data: Quote = props.data;
    const path = useLocation();
    const [currentId, setCurrentId] = useState<number>(-1);

    if (data == undefined) {
        let _id = path.pathname.split('/')[2];
        if (_id === "random")
            if (currentId === -1) {
                data = QuoteService.getRandom();
                setCurrentId(data.id)
            }
            else
                data = QuoteService.getById(currentId);    
        else
            data = QuoteService.getById(parseInt(_id));
    }

    const [karma, setKarma] = useState<number>(data.karma);
    const [voted, setVoted] = useState<VoteState>(VoteState.NO)

    const upvote = () => {
        if (voted === VoteState.NO) {
            QuoteService.upvote(data.id);
            setVoted(VoteState.UP);
        }
        else if (voted === VoteState.DOWN) {
            // lazy method: upvote twice to cancel out old downvote
            QuoteService.upvote(data.id);
            QuoteService.upvote(data.id);
            setVoted(VoteState.UP);
        }
        else if (voted === VoteState.UP) {
            // lazy method: downvote to cancel out old upvote
            QuoteService.downvote(data.id);
            setVoted(VoteState.NO);
        }
        setKarma(data.karma);
    }

    const downvote = () => {
        if (voted === VoteState.NO) {
            QuoteService.downvote(data.id);
            setVoted(VoteState.DOWN);
        }
        else if (voted === VoteState.UP) {
            // lazy method: downvote twice to cancel out old upvote
            QuoteService.downvote(data.id);
            QuoteService.downvote(data.id);
            setVoted(VoteState.DOWN);
        }
        else if (voted === VoteState.DOWN) {
            // lazy method: downvote to cancel out old upvote
            QuoteService.upvote(data.id);
            setVoted(VoteState.NO);
        }
        setKarma(data.karma);
    }

    return (
        <div style={{display: "flex"}}>
            <div className={"karma"}>
                {karma}
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
                        <th>Quote</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{maxWidth: "50px"}}>
                            { data.name }
                        </td>
                        <td style={{textAlign: "left", maxWidth: "300px" }}>
                            { data.text }
                        </td>
                        <td>
                            { data.date }
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default QuoteCard;