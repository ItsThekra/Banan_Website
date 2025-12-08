import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  serviceName: string = 'خدمة التبصيم في السفارة الألمانية';
  requestNumber: string = Math.floor(100000 + Math.random() * 900000).toString();
  countdown: number = 300; // 5 دقائق للداشبورد

  intervalId: any;

  // Pop-up
  showPopup: boolean = false;
  popupCountdown: number = 60; // دقيقة واحدة
  popupInterval: any;

  // بيانات الهوية
  nationalId: string = '1234567890';
  fullName: string = 'ذكرى';
  fingerprintStatus: string = ' مكتمل';

  constructor() {
    this.startCountdown();
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  get formattedCountdown() {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  }

  fingerprintLogin() {
    this.openFingerprintPopup();
  }

  openFingerprintPopup() {
    this.showPopup = true;
    this.popupCountdown = 60;

    this.popupInterval = setInterval(() => {
      if (this.popupCountdown > 0) {
        this.popupCountdown--;
      } else {
        this.closePopup();
        alert('تم التبصيم بنجاح ');
        this.fingerprintStatus = 'مكتمل';
      }
    }, 1000);
  }

  cancelFingerprint() {
    this.closePopup();
    alert('تم إلغاء التبصيم ');
  }

  resendFingerprint() {
    clearInterval(this.popupInterval);
    this.openFingerprintPopup();
    alert('تم إعادة إرسال طلب التبصيم ');
  }

  closePopup() {
    this.showPopup = false;
    clearInterval(this.popupInterval);
  }
}
