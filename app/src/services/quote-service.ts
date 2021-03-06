import { quotelist } from "../mockdata";
import Quote from "../models/quote";


const QuoteService = {
    getById(id: number): Quote {
        return quotelist[id];
    },
    getAll(id: number): Quote {
        return quotelist[id];
    },
    getRandom(): Quote {
        let randomId = Math.floor(Math.random() * quotelist.length);
        return quotelist[randomId]
    },
    upvote(id: number): void {
        // check if post is in user voted list
        quotelist[id].karma++;
    },
    downvote(id: number): void {
        // check if post is in user voted list
        quotelist[id].karma--;
    },
}

export default QuoteService;