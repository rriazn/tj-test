import { inject, Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  private url = "http://localhost:3000/login";
  currentUserSignal = signal<UserInterface | undefined | null>(undefined);

  
}
