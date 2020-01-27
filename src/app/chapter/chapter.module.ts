import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaptersComponent } from '../chapters/chapters.component';
import { ChapterComponent } from './chapter.component';
import { MatCardModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LevelService } from './levels/services/level.service';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UploadTaskChapterComponent } from './add-chapter/upload-task-chapter/upload-task-chapter.component';
import { AddLevelComponent } from './levels/services/add-level/add-level.component';
import { EditLevelComponent } from './levels/services/edit-level/edit-level.component';
import { RemoveLevelComponent } from './levels/services/remove-level/remove-level.component';



@NgModule({
  declarations: [
    ChaptersComponent,
    ChapterComponent,
    AddChapterComponent,
    UploadTaskChapterComponent,
    AddLevelComponent,
    EditLevelComponent,
    RemoveLevelComponent
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
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    ChaptersComponent,
    ChapterComponent,
    AddChapterComponent,
    UploadTaskChapterComponent,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    LevelService
  ],
  entryComponents: [AddLevelComponent, EditLevelComponent, RemoveLevelComponent]
})
export class ChapterModule { }