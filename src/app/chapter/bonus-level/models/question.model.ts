import { Answer } from './answer.model';

export class Question {
    title: string;
    answers: Answer[] = [];
}