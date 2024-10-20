import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  toast = inject(HotToastService);
  router = inject(Router);
  btnSubmit = 'Register';

  handleSubmit(values: User) {
    this.authService.registerUser(values).subscribe({
      next: () => {
        this.toast.success('Done');
        this.router.navigateByUrl('/login');
      },
      error: () => this.toast.error('Error'),
    });
  }
}
