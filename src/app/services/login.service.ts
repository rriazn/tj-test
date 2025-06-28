import { inject, Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  private url = "http://localhost:3000/admin";
  currentUserSignal = signal<UserInterface | undefined | null>(undefined);

  async verifyAdmin(): Promise<boolean> {
  try {
    const response = await firstValueFrom(
      this.http.get('http://localhost:3000/admin', { responseType: 'text' })
    );
    return true;
  } catch (error) {
    return false;
  }
}
}
