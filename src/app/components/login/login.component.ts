import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { catchError } from 'rxjs';
import { HashService } from '../../services/hash.service';

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
  hash = inject(HashService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  formHash = this.fb.nonNullable.group({
    username: ['', Validators.required],
    passwordHash: ['', Validators.required],
  });
  gaveWrongPassword = signal<boolean>(false);

  async onSubmit() {
    this.formHash.controls.passwordHash.setValue(await this.hash.hashStringSHA256(this.form.getRawValue().password));
    this.formHash.controls.username.setValue(this.form.getRawValue().username);
    
    this.http.post<{user: UserInterface}>("http://localhost:3000/login", {user: this.formHash.getRawValue()}).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.gaveWrongPassword.set(true);
          this.form.reset();
        }
        throw(error);
      })
    ).subscribe((response) => {
      localStorage.setItem('token', response.user.token);
      this.loginService.currentUserSignal.set(response.user);
      this.gaveWrongPassword.set(false);
      this.router.navigateByUrl("/");
    });
  }
}
