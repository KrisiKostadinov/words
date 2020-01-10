import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsComponent } from './words/words.component';
import { WordsService } from './words/services/words.service';
import { MaterialModule } from '../material/material.module';
import { ChapterService } from '../chapters/services/chapter.service';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [
    WordsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatProgressSpinnerModule
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
