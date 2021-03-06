import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { quotelist } from '../../mockdata';
import Quote from '../../models/quote';
import './quote-card.css';

enum VoteState {
    NO, UP, DOWN 
}

function QuoteCard(props: any) {
    const data: Quote = props.data;
    const [karma, setKarma] = useState<number>(data.karma);
    const [voted, setVoted] = useState<VoteState>(VoteState.NO)

    const upvote = () => {
        if (voted === VoteState.NO) {
            quotelist[data.id].karma++; // update mock data
            setVoted(VoteState.UP);
        }
        else if (voted === VoteState.DOWN) {
            quotelist[data.id].karma += 2; // update mock data
            setVoted(VoteState.UP);
        }
        else if (voted === VoteState.UP) {
            quotelist[data.id].karma--; // update mock data
            setVoted(VoteState.NO);
        }
        setKarma(data.karma);
    }

    const downvote = () => {
        if (voted === VoteState.NO) {
            quotelist[data.id].karma--; // update mock data
            setVoted(VoteState.DOWN);
        }
        else if (voted === VoteState.UP) {
            quotelist[data.id].karma -= 2; // update mock data
            setVoted(VoteState.DOWN);
        }
        else if (voted === VoteState.DOWN) {
            quotelist[data.id].karma++; // update mock data
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