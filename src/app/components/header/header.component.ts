import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SaveActiveCompService } from '../../services/save-active-comp.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  activeCompService = inject(SaveActiveCompService);

  logout() {
    localStorage.setItem('token', '');
    this.loginService.currentUserSignal.set(null);
    this.router.navigateByUrl('/');
  }
}
