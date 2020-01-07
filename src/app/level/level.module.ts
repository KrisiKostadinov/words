import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsComponent } from './words/words.component';
import { WordsService } from './words/words.service';
import { MaterialModule } from '../material/material.module';
import { ChapterComponent } from '../chapter/chapter.component';
import { ChaptersComponent } from '../chapters/chapters.component';
import { ChapterService } from '../chapters/services/chapter.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    WordsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    WordsComponent
  ],
  providers: [
    WordsService,
    ChapterService
  ]
})
export class LevelModule { }
