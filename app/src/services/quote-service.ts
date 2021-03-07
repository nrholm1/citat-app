import { quotelist } from "../mockdata";
import Quote from "../models/quote";
import axios, { AxiosResponse } from 'axios';

const apiURL = "http://localhost:8080/quotes"

const QuoteService = {
    getById(id: number): Promise<AxiosResponse<Quote>> {
        console.log("sending req to id: " + id)
        return axios.get<Quote>(`${apiURL}/${id}`);
    },
    getAll(id: number): Quote {
        return quotelist[id];
    },
    getRandom(): Promise<AxiosResponse<Quote>> {
        let randomId = Math.floor(Math.random() * quotelist.length);
        return axios.get<Quote>(`${apiURL}/${randomId}`);
    },
    upvote(id: number): void {
        // check if post is in user voted list
        quotelist[id].Karma++;
    },
    downvote(id: number): void {
        // check if post is in user voted list
        quotelist[id].Karma--;
    },
}

export default QuoteService;