import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.loginData).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
