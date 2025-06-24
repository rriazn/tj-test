import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loginService = inject(LoginService);

  logout() {
    localStorage.setItem('token', '');
    this.loginService.currentUserSignal.set(null);
  }
}
