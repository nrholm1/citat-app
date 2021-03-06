import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { quotelist } from '../../mockdata';
import Quote from '../../models/quote';
import './quote-card.css';
import QuoteService from '../../services/quote-service'

enum VoteState {
    NO, UP, DOWN 
}

function QuoteCard(props: any) {
    const data: Quote = props.data;
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
                <th>
                    <Button onClick={() => upvote()} variant="success">↑</Button>
                </th>
                <tr>
                    <Button onClick={() => downvote()} variant="danger">↓</Button>
                </tr>
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
                        <td>
                            { data.name }
                        </td>
                        <td style={{textAlign: "left"}}>
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