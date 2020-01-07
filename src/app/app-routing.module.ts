import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsComponent } from './level/words/words.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChapterComponent } from './chapter/chapter.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule) },
  { path: '', component: ChaptersComponent },
  { path: 'chapter/:id', component: ChapterComponent },
  { path: 'level/:id', component: WordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
