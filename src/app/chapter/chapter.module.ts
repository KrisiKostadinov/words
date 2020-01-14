import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaptersComponent } from '../chapters/chapters.component';
import { ChapterComponent } from './chapter.component';
import { MatCardModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LevelService } from './levels/services/level.service';
import { ChapterRoutiongModule } from './chapter.routing.module';



@NgModule({
  declarations: [
    ChaptersComponent,
    ChapterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [
    ChaptersComponent,
    ChapterComponent,
    MatProgressSpinnerModule
  ],
  providers: [
    LevelService
  ]
})
export class ChapterModule { }
