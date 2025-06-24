import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  loginService = inject(LoginService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  gaveWrongPassword = signal<boolean>(false);

  onSubmit() {
    this.loginService.login(this.form.getRawValue().password).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Unauthorized');
          this.gaveWrongPassword.set(true);
          this.form.reset();
        } else {
          console.error('Error:', error);
        }
        throw(error);
      })
    ).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.loginService.currentUserSignal.set(response);
      this.gaveWrongPassword.set(false);
    });
  }
}
