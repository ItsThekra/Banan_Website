import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  nationalId: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  loginWithBanaan() {
    if (!this.nationalId) {
      this.errorMessage = 'الرجاء إدخال رقم الهوية';
      return;
    }

    this.errorMessage = '';
    alert('تم تسجيل الدخول بنجاح عبر بنان!');
    this.router.navigate(['/home']);
  }
}
