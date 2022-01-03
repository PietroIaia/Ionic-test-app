import React, { useState } from "react";
import QuestionsContext, { Answer, Question, QuestionContextModel } from "./questions-context";
import compareVotes from "../utils/compareVotes";


const QuestionsContextProvider: React.FC = ({children}) => {

    // Estado que tendrá la lista de preguntas con sus respuestas
    const [questions, setQuestions] = useState<Question[]>([]);

    // Acción para agregar una pregunta nueva
    const addQuestion = (title: string, description: string) => {

        // Si el título es vacío, no agregar nada
        if (!title.trim().length) 
            return;

        const newQuestion: Question = {
            id: Math.random().toString(),
            title,
            description,
            votes: 0,
            answers: []
        };

        /** --NOTA: Tanto las preguntas como las respuestas son mostradas 
        en orden de mayor a menor en cuanto a sus votos */
        setQuestions(currQuestions => {
            return [newQuestion, ...currQuestions].sort(compareVotes);
        });
    }

    // Acción para agregar una nueva respuesta
    const addAnswer = (text: string, question_id: string) => {
        
        // Si el texto de la respuesta es vacío, no agregar nada
        if (!text.trim().length) 
            return;

        const newAnswer: Answer = {
            id: Math.random().toString(),
            text,
            votes: 0,
        };

        /** Encontramos el objeto que representa la pregunta a la cual 
        se está respondiendo y colocamos la respuesta en su lista de respuestas */
        let questionFound = questions.find(x => x.id === question_id)!!;
        const newQuestion: Question = {
            id: questionFound.id,
            title: questionFound.title,
            description: questionFound.description,
            votes: questionFound.votes,
            answers: [newAnswer, ...questionFound.answers].sort(compareVotes)
        };

        setQuestions(currQuestions => {
            return [
                newQuestion,
                ...currQuestions.filter((q) => q.id !== question_id)
            ].sort(compareVotes);
        });
    }

    // Acción para votar una pregunta
    const voteQuestion = (value: number, question: Question) => {

        // Creamos la copia de la pregunta con puntaje diferente
        const newQuestion: Question = {
            id: question.id,
            title: question.title,
            description: question.description,
            votes: question.votes + value,
            answers: question.answers
        };

        setQuestions(currQuestions => {
            return [
                ...currQuestions.filter((q) => q.id !== question.id), 
                newQuestion
            ].sort(compareVotes);
        });
    }

    // Acción para votar una respuesta
    const voteAnswer = (value: number, answer: Answer, question_id: string) => {

        // Creamos la copia de la respuesta con puntaje diferente
        const newAnswer: Answer = {
            id: answer.id,
            text: answer.text,
            votes: answer.votes + value,
        };

        /** Luego, buscamos la pregunta en la lista de preguntas y creamos 
        la copia de esta pregunta con esta nueva copia de la respuesta */
        let answerQ = questions.find((q) => q.id === question_id)!!;
        const newQuestion: Question = {
            id: answerQ.id,
            title: answerQ.title,
            description: answerQ.description,
            votes: answerQ.votes,
            answers: [...answerQ.answers.filter((a) => a.id !== answer.id), newAnswer].sort(compareVotes)
        };

        setQuestions(currQuestions => {
            return [
                ...currQuestions.filter((q) => q.id !== question_id), 
                newQuestion
            ].sort(compareVotes);
        });
    }


    // Rellenamos el context con los valores verdaderos y se lo pasamos al Provider
    const questionsContext: QuestionContextModel = {
        questions,
        addQuestion,
        addAnswer,
        voteQuestion,
        voteAnswer
    }

    return (
        <QuestionsContext.Provider value={questionsContext}>
            {children}
        </QuestionsContext.Provider>
    );
}

export default QuestionsContextProvider;