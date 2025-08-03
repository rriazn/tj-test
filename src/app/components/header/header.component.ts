import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ActiveCompService } from '../../services/active-comp.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  activeCompService = inject(ActiveCompService);

  logout() {
    this.loginService.logout().pipe(
      catchError((err) => {
        throw(err);
      })
    ).subscribe((res) => {
      localStorage.setItem('token', '');
      this.loginService.currentUserSignal.set(null);
      this.router.navigateByUrl('/');
    })
  }
}
