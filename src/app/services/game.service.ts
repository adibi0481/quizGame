import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameResults } from '../shared/models/game-results.model';
import { QuestionStatistics } from '../shared/models/question-statistics.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameResults: GameResults[] = [
    {
      username: "Player1",
      date: new Date(),
      totalScore: 30,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': true ,  
         'Which essential condiment is also known as Japanese horseradish?': false ,
        'How many planets make up our Solar System?':false ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
      }
    },
    {
      username: "Lital",
      date: new Date(),
      totalScore: 40,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': true ,  
         'Which essential condiment is also known as Japanese horseradish?': true ,
         'How many planets make up our Solar System?':true ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
      }
    },
    {
      username: "DR",
      date: new Date(),
      totalScore: 20,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': true ,  
         'Which essential condiment is also known as Japanese horseradish?': true ,
         'How many planets make up our Solar System?':true ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
      }
    },
    {
      username: "BR",
      date: new Date(),
      totalScore: 10,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': true ,  
         'Which essential condiment is also known as Japanese horseradish?': true ,
         'How many planets make up our Solar System?':true ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
      }
    },
    {
      username: "Player2",
      date: new Date(),
      totalScore: 50,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': true ,  
         'Which essential condiment is also known as Japanese horseradish?': true ,
         'How many planets make up our Solar System?':true ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
      }
    },
    {
      username: "Player3",
      date: new Date(),
      totalScore: 40,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': true ,  
         'Which essential condiment is also known as Japanese horseradish?': true ,
         'How many planets make up our Solar System?':true ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
      }
    },
    {
      username: "Rotem",
      date: new Date(),
      totalScore: 20,
      answers: {
        'Who directed the 1973 film "American Graffiti"?': false ,  
         'Which essential condiment is also known as Japanese horseradish?': true ,
         'How many planets make up our Solar System?':true ,
         'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':true 
      }
    },
    {
      username: "Adibi",
      date: new Date(),
      totalScore: 100,
      answers: {
      'Who directed the 1973 film "American Graffiti"?': true ,  
       'Which essential condiment is also known as Japanese horseradish?': true ,
       'How many planets make up our Solar System?':false ,
       'What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?':false 
    }
    }
  ];

  constructor() { }

  getLeaderboard(): Observable<GameResults[]> {
    return of(this.gameResults.sort((a, b) => b.totalScore - a.totalScore).slice(0, 10));
  }

  getQuestionsStatistics(): Observable<{ [question: string]: QuestionStatistics }> {
    let questionStats: {[question: string]: QuestionStatistics} = {};    
    this.gameResults.map((results: GameResults) => {
      for (const question of Object.keys(results.answers)) {
        if (!questionStats[question]) {
          questionStats[question] = new QuestionStatistics();
        }
  
        let counterName = results.answers[question] ? "rightAnswers" : "wrongAnswers";
        questionStats[question][counterName]++;
      }
      
    })

    return of(questionStats);
  }

  submitGameResults(gameResults: GameResults): Observable<any> {
    return of(this.gameResults.push(gameResults));
  }

  isNameAvailable(username: string) {
    return of(!this.gameResults.some(game => game.username === username));
  }
}
