import { Component, OnInit, AfterViewInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { WordsService } from './services/words.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationWord } from './animations/word.animation';
import { LevelUpAnimation } from './animations/level-up.animation';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LevelService } from 'src/app/chapter/levels/services/level.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
  animations: [
    AnimationWord,
    LevelUpAnimation
  ]
})
export class WordsComponent implements OnInit, OnDestroy {
  isOpen = "open";
  stateLevelUpStatistics = "closed";
  stateLevelUp = "closed";
  stateBonus = "closed";

  isShowIncorrectWords: boolean = false;
  
  currentWord: string = "";
  wordsObj: Object;
  levelUp: boolean = false;
  successWords = 0;
  currectWordsCount = 0;
  incorrectWordsCount = 0;
  
  stars: Array<boolean> = [false, false, false];
  pointsWord: number = 60;
  points: number = 0;
  bonusPoints: number = 0;
  bonusPointsWord: number = 70;
  bonusWordsCount: number = 0;
  totalBonusWordsCount: number = 0;
  totalCountWords: number;
  unfamiliarWords: number;
  incorrenctWords = [];

  constructor(private wordsService: WordsService,
    private route: ActivatedRoute, 
    private auth: AuthService,
    private levelService: LevelService,
    private router: Router,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.initLevel();
  }

  ngOnDestroy() {
    
  }

  initLevel(levelId = null, timeout = 0) {
    this.isOpen = "open";
    this.stateLevelUpStatistics = "closed";
    this.stateLevelUp = "closed";
    this.stateBonus = "closed";

    this.isShowIncorrectWords = false;

    this.currentWord = "";
    this.wordsObj = null;
    this.levelUp = false;
    this.successWords = 0;
    this.currectWordsCount = 0;
    this.incorrectWordsCount = 0;

    this.stars = [false, false, false];
    this.pointsWord = 60;
    this.points = 0;
    this.bonusPoints = 0;
    this.bonusPointsWord = 70;
    this.bonusWordsCount = 0;
    this.totalBonusWordsCount = 0;
    this.totalCountWords;
    this.unfamiliarWords;
    this.incorrenctWords = [];

    setTimeout(() => {
      this.stateLevelUp = "open";
      this.levelUp = false;
    }, timeout);

    if(levelId == null) {
      levelId = this.route.snapshot.params['id'];
    }

    this.wordsService.getAllWordsInLevel(levelId).subscribe(data => {
      this.wordsObj = data;
      this.totalCountWords = this.wordsObj['words'].length;
      this.totalBonusWordsCount = this.wordsObj['bonusWords'].length;
    });
  }
  
  addLetter(letter) {
    this.check(letter);



  }

  check(letter) {
    this.currentWord += letter;
    this.isOpen = "open";
  }
  
  checkWord() {
    var currentWordExist = false;
    for(let word of this.wordsObj['words']) {
      if(word.word == this.currentWord && word.isShow == false) {
        this.successWords++;
        word.isShow = true;
        this.isOpen = 'open';
        this.points += this.pointsWord;
        this.currectWordsCount++;
        currentWordExist = true;
      }
      if(this.successWords == this.wordsObj['words'].length) {
        this.endLevel();
        this.unfamiliarWords = this.totalCountWords - this.successWords;
        if(this.currectWordsCount <= this.wordsObj['words'].length / 4) {
          this.stars = [true, false, false];
        } else if(this.currectWordsCount <= this.wordsObj['words'].length / 2) {
          this.stars = [true, true, false];
        } else if(this.currectWordsCount >= this.wordsObj['words'].length - 2) {
          this.stars = [true, true, true];
        }

        var userId = this.auth.userData.uid;
        var levelId = this.route.snapshot.params['id'];
        var data = {
          points: this.points,
          stars: this.stars,
          incorrenctWords: this.incorrenctWords
        };
        
        this.wordsService.saveData(userId, levelId, data).then(data => {
          console.log(data);
        });
      }
    }

    for(let bWord of this.wordsObj['bonusWords']) {
      if(bWord.word == this.currentWord && bWord.isShow == false) {
        bWord.isShow = true;
        this.points += this.bonusPointsWord;
        this.stateBonus = "open";
        this.bonusPoints += this.bonusPointsWord;
        this.bonusWordsCount++;
        this.currectWordsCount += 2;
        currentWordExist = true;
      }
    }
    if(currentWordExist == false) {
      this.incorrectWordsCount++;

      this.incorrenctWords.push(this.currentWord);
      if(this.incorrectWordsCount == 3) {
        this.currectWordsCount = 0;
      }
    }
    
    this.isOpen = 'closed';
    
    setTimeout(() => {
      this.currentWord = "";
    }, 1000);
  }

  endLevel() {
    setTimeout(() => {
      this.stateLevelUp = "closed";
    }, 1000);
    setTimeout(() => {
      this.levelUp = true;
    }, 2000);
    setTimeout(() => {
      this.stateLevelUpStatistics = "open";
    }, 2000);
    setTimeout(() => {
      var temp = this.points;
    this.points = 0;
      var interval = null;

      interval = setInterval(() => {
        this.points++;
        if(this.points >= temp) {
          clearInterval(interval);
        }
      }, 20);
    }, 2000);

    this.isOpen = 'open';
  }

  showIncorrectWords() {
    this.isShowIncorrectWords = !this.isShowIncorrectWords;
  }

  nextLevel(levelId) {
    this.initLevel(levelId, 0);
  }
}
