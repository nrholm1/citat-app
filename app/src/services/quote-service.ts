import { quotelist } from "../mockdata";
import Quote from "../models/quote";
import axios, { AxiosResponse } from 'axios';
import QuoteArrayDTO from "../models/quoteArrayDto";
import QuoteDto from "../models/quoteDto";

const apiURL = "http://192.168.1.106:8080/quotes"

const QuoteService = {
    create(quoteDto: QuoteDto): Promise<AxiosResponse<Quote>> {
        return axios.post<Quote>(apiURL, quoteDto);
    },
    getById(id: number): Promise<AxiosResponse<Quote>> {
        console.log("sending req to id: " + id)
        return axios.get<Quote>(`${apiURL}/id=${id}`);
    },
    getAll(): Promise<AxiosResponse<QuoteArrayDTO>> {
        return axios.get<QuoteArrayDTO>(apiURL);
    },
    getRandom(): Promise<AxiosResponse<Quote>> {
        return axios.get<Quote>(`${apiURL}/random`);
    },
    doMatchup(_winnerId: number, _loserId: number): Promise<AxiosResponse<QuoteArrayDTO>> {
        let matchupResult = {winnerid: _winnerId, loserid: _loserId};
        return axios.post<QuoteArrayDTO>(`${apiURL}/matchup`, matchupResult);
    }
}

export default QuoteService;
