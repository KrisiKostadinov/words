import { Component, OnInit, EventEmitter } from '@angular/core';
import { WordsService } from '../level/words/words.service';
import { WordService } from '../level/word/word.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {

  ngOnInit() {
  }
}
