import React from 'react';

// Interfaz que define como estará compuesta cada pregunta
export interface Question {
    id: string;
    title: string;
    description: string;
    votes: number;
    answers: Answer[]
}

// Interfaz que define como estará compuesta cada respuesta
export interface Answer {
    id: string;
    text: string;
    votes: number;
}

// Interfaz que define como estará compuesto el context
export interface QuestionContextModel {
    questions: Question[];
    addQuestion: (title: string, description: string) => void;
    addAnswer: (text: string, question_id: string) => void;
    voteQuestion: (value: number, question: Question) => void;
    voteAnswer: (value: number, answer: Answer, question_id: string) => void;
}

// Inicializamos el context y lo exportamos
const QuestionsContext = React.createContext<QuestionContextModel>({
    questions: [],
    addQuestion: () => {},
    addAnswer: () => {},
    voteQuestion: () => {},
    voteAnswer: () => {}
});

export default QuestionsContext;