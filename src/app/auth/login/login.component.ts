import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmit: boolean = false;
  user: User;
  
  constructor(private authService: AuthService, private router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.isSubmit = true;
    this.authService.emailSignIn(this.loginForm.value.email, this.loginForm.value.password);
  }
}