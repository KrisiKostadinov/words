import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsComponent } from './level/words/words.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChapterComponent } from './chapter/chapter.component';
import { AddChapterComponent } from './chapter/add-chapter/add-chapter.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule) },
  { path: '', component: ChaptersComponent },
  { path: 'chapters', component: ChaptersComponent },
  { path: 'chapter', loadChildren: () => import('./chapter/chapter.module').then(m => m.ChapterModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
