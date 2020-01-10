import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsService } from '../level/words/services/words.service';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule
  ],
  exports: [
    NavbarComponent,
    MatButtonModule,
    MatSliderModule
  ],
  providers: [ WordsService ]
})
export class SharedModule { }
