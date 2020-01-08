import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { WordsService } from './words.service';
import { trigger, state, style, transition, animate, keyframes, useAnimation } from '@angular/animations';
import { LevelService } from 'src/app/chapter/levels/services/level.service';
import { ActivatedRoute } from '@angular/router';
import { AnimationWord } from './animations/word.animation';
import { LevelUpAnimation } from './animations/level-up.animation';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
  animations: [
    AnimationWord,
    LevelUpAnimation
  ]
})
export class WordsComponent implements OnInit {
  isOpen = "open";
  stateLevelUpStatistics = "closed";
  stateLevelUp = "open";

  letters: any;
  currentWord: string = "";
  wordIndex: any = null;
  wordsObj: Object;
  errorBtn: boolean = true;
  showSuccess: boolean = false;
  isExist: boolean = false;
  levelUp: boolean = false;
  successWords = 0;
  down: boolean = false;

  constructor(private wordsService: WordsService,
    private levelService: LevelService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.wordsService.getAllWordsInLevel(id).subscribe(data => {
      this.wordsObj = data;
    });
  }
  
  addLetter(letter) {
    this.currentWord += letter;
    this.isOpen = "open";
  }
  
  checkWord() {
    for(let word of this.wordsObj['words']) {
      if(word.word == this.currentWord && word.isShow == false) {
        this.successWords++;
        word.isShow = true;
        this.isOpen = 'open';
      }
      if(this.successWords == this.wordsObj['words'].length) {
        setTimeout(() => {
          this.stateLevelUp = "closed";
        }, 1000);
        setTimeout(() => {
          this.levelUp = true;
        }, 2000);
        setTimeout(() => {
          this.stateLevelUpStatistics = "open";
        }, 2000);

        this.isOpen = 'open';
      }
    }
    this.isOpen = 'closed';
    
    setTimeout(() => {
      this.currentWord = "";
    }, 1000);
  }
}
