import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService, User } from '../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  toast = inject(HotToastService);
  router = inject(Router);

  handleSubmit(values: User) {
    this.authService.loginUser(values).subscribe({
      next: (data) => {
        localStorage.setItem(
          'token',
          (data as { accessToken: string }).accessToken
        );
        this.toast.success('Done');
        this.router.navigateByUrl('/product/list');
      },
      error: () => this.toast.error('Error'),
    });
  }
}
