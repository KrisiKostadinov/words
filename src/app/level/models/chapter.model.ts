import { Question } from 'src/app/chapter/bonus-level/models/question.model';

export class Chapter {
    constructor(id, name, levels, bonusLevel, completedLevels, isPlayed) {
        
    }

    id?: string;
    name: string;
    levels?: Array<string> = [];
    bonusLevel: Question[] = [];
    completedLevels: CompletedLevel[] = [];
    isPlayed: boolean;
}

export class CompletedLevel {
    userId: string;
    levelId: string;
}