import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaptersComponent } from '../chapters/chapters.component';
import { ChapterComponent } from './chapter.component';
import { MatCardModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LevelService } from './levels/services/level.service';
import { ChapterRoutiongModule } from './chapter.routing.module';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadTaskChapterComponent } from './add-chapter/upload-task-chapter/upload-task-chapter.component';



@NgModule({
  declarations: [
    ChaptersComponent,
    ChapterComponent,
    AddChapterComponent,
    UploadTaskChapterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    ChaptersComponent,
    ChapterComponent,
    AddChapterComponent,
    UploadTaskChapterComponent,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    LevelService
  ]
})
export class ChapterModule { }
