import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { WordsService } from './words.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { LevelService } from 'src/app/chapter/levels/services/level.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
  animations: [
    trigger('isOpen', [
      // ...
      state('closed', style({
        opacity: 0,
      })),
      state('open', style({
        opacity: 1
      })),
      state('existNo', style({
        transform: 'translateX(10px)'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('open => existNo', [
        animate('1s', keyframes([
          style({
            transform: 'translateX(10px)', offset: 0.25,
            opacity: 1
          }),
          style({
            transform: 'translateX(-10px)', offset: 0.5,
            opacity: 0.75
          }),
          style({
            transform: 'translateX(10px)', offset: 0.75,
            opacity: 0.2
          }),
          style({
            transform: 'translateX(0)', offset: 1,
            opacity: 0
          })
        ]))
      ]),
    ]),
  ],
})
export class WordsComponent implements OnInit {
  isOpen = "open";

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
      if(word.word == this.currentWord) {
        this.successWords++;
        word.isShow = true;
        this.isOpen = 'open';
      }
      if(this.successWords == this.wordsObj['words'].length) {
        setTimeout(() => {
          this.levelUp = true;
        }, 1000);
        this.isOpen = 'open';
      }
    }
    this.isOpen = 'closed';
    
    setTimeout(() => {
      this.currentWord = "";
    }, 1000);
  }
}
