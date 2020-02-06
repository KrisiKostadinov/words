import { Word } from './word.model';

export class WordsObj {
    id?: any;
    words: Array<Word> = new Array<Word>();
    letters: string;
    completedLevels: object[] = [];
}