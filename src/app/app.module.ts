import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LettersComponent } from './letters/letters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevelModule } from './level/level.module';
import { WordsService } from './level/words/words.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth/auth.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthRoutingModule } from './auth/auth.routing.module';
import { AuthInterceptor } from './auth/interceptors/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material';
import { ChapterComponent } from './chapter/chapter.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { LevelService } from './chapter/levels/services/level.service';

@NgModule({
  declarations: [
    AppComponent,
    LettersComponent,
    ChaptersComponent,
    ChapterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LevelModule,
    SharedModule,
    AuthModule,
    AuthRoutingModule,
    MatCardModule
  ],
  providers: [ 
    WordsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
