import { Component, OnInit } from '@angular/core';
import { WordService } from './word.service';
import { WordsService } from '../words/words.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    
  }

}
