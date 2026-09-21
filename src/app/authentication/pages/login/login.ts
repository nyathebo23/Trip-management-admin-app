import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {form, FormField, required} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';
import { LoginData } from '../../interfaces/login-data';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../services/token-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormField, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  private auth = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginModel = signal<LoginData>({ username: '', password: '' });

  errorMessage = signal<string | null>(null);

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  submit() {
    if (this.loginForm().valid()) {
      const payload = this.loginModel();
      this.errorMessage.set(null); 
      this.auth.login(payload).subscribe({
        next: (res) => {
          this.auth.saveUser(res.token);
          this.tokenService.saveToken(res.token);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/management/travel';
          this.router.navigate([returnUrl]);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.errorMessage.set(err.error?.message || 'Invalid username or password !');
          } else if (err.status === 0) {
            this.errorMessage.set ('Unable to connect to the server. Please check your network connection and try again.');
          } else {
            this.errorMessage.set('An unexpected error occurred. Please try again later.');
          }
        },
      });
    } 
  }
}
