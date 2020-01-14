import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSubmit: boolean = false;
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  
  constructor(private authService: AuthService, private router: Router) {
    
  }

  onSubmit() {
    this.isSubmit = true;
    this.authService.emailSignUp(this.registerForm.value.email, this.registerForm.value.password);
  }
  
  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
}