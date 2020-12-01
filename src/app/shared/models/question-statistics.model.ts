export class QuestionStatistics {
    rightAnswers: number;
    wrongAnswers: number;

    constructor() {
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
    }

    get totalAnswered() {
        return this.rightAnswers + this.wrongAnswers;
    }

    get rightPercentage() {
        return Math.round(((this.rightAnswers / this.totalAnswered) + Number.EPSILON) * 100);
    }

    get wrongPercentage() {
        return Math.round(((this.wrongAnswers / this.totalAnswered) + Number.EPSILON) * 100);
    }
}