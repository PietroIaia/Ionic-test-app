import { Answer, Question } from "../data/questions-context";

const compareVotes = (a:Answer | Question, b:Answer| Question) => {
    if ( a.votes < b.votes ){
        return 1;
    }
    if ( a.votes > b.votes ){
        return -1;
    }
    return 0;
}

export default compareVotes;