import { quotelist } from "../mockdata";
import Quote from "../models/quote";
import axios, { AxiosResponse } from 'axios';
import QuoteArrayDTO from "../models/quoteArrayDto";
import QuoteDto from "../models/quoteDto";

const apiURL = "http://localhost:8080/quotes"

const QuoteService = {
    create(quoteDto: QuoteDto): Promise<AxiosResponse<Quote>> {
        return axios.post<Quote>(apiURL, quoteDto);
    },
    getById(id: number): Promise<AxiosResponse<Quote>> {
        console.log("sending req to id: " + id)
        return axios.get<Quote>(`${apiURL}/${id}`);
    },
    getAll(): Promise<AxiosResponse<QuoteArrayDTO>> {
        return axios.get<QuoteArrayDTO>(apiURL);
    },
    getRandom(): Promise<AxiosResponse<Quote>> {
        return axios.get<Quote>(`${apiURL}/random`);
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