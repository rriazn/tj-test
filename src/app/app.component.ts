import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { UserInterface } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  loginService = inject(LoginService);
  ngOnInit(): void {
    this.http.get<{user: UserInterface}>('http://localhost:3000/users/auth').subscribe({
      next: (resp) => {
        this.loginService.currentUserSignal.set(resp.user);
      },
      error: (err) => {
        this.loginService.currentUserSignal.set(null);
        localStorage.clear();
      }   
    });
  }

  
}
