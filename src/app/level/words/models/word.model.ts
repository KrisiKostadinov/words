export class Word {
    constructor(word, isShow = false) {
        this.word = word;
        this.isShow = isShow;
    }

    word: string;
    isShow: boolean;
}