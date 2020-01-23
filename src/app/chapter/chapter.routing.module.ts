import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterComponent } from './chapter.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { WordsComponent } from '../level/words/words.component';

const routes: Routes = [
    {
        path: 'chapter',
        children: [
            { path: 'add', component: AddChapterComponent },
            { path: ':id', component: ChapterComponent },
            { path: ':chapterId/level/:id', component: WordsComponent },
            { path: ':chapterId/level/:nextLevelId', component: WordsComponent }
        ],
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class ChapterRoutiongModule {}