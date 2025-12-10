import { Component, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnDestroy {
  // Mock Data
  nationalId: string = '1234567890';
  fullName: string = 'اسم المستخدم';
  fingerprintStatus: string = 'بانتظار التحقق';

  showPopup: boolean = false;
  popupCountdown: number = 30; // one sec
  private popupTimerId: number | null = null;

  private mainCountdownSeconds = 300;
  formattedCountdown: string = this.formatTime(this.mainCountdownSeconds);
  private mainTimerId: number | null = null;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  fingerprintLogin() {
    this.startPopupTimer(30);
    this.showPopup = true;
    this.fingerprintStatus = 'جارٍ التحقق...';
  }

  cancelFingerprint() {
    this.clearPopupTimer();
    this.showPopup = false;
    this.fingerprintStatus = 'ملغاة';
  }

  resendFingerprint() {
    this.startPopupTimer(30);
    this.showPopup = true;
    this.fingerprintStatus = 'جارٍ إعادة المحاولة...';
  }

  private startPopupTimer(seconds: number) {
    this.clearPopupTimer();
    this.popupCountdown = seconds;

    this.ngZone.runOutsideAngular(() => {
      this.popupTimerId = window.setInterval(() => {
        this.ngZone.run(() => {
          this.popupCountdown--;
          if (this.popupCountdown <= 0) {
            this.onPopupTimeout();
          }
          this.cdr.markForCheck();
        });
      }, 1000);
    });
  }

  private onPopupTimeout() {
    this.clearPopupTimer();
    this.showPopup = false;
    this.fingerprintStatus = 'انتهت المهلة — لم يتم التحقق';
  }

  private clearPopupTimer() {
    if (this.popupTimerId !== null) {
      window.clearInterval(this.popupTimerId);
      this.popupTimerId = null;
    }
  }

  startMainCountdown() {
    if (this.mainTimerId) return;
    this.mainTimerId = window.setInterval(() => {
      if (this.mainCountdownSeconds > 0) {
        this.mainCountdownSeconds--;
        this.formattedCountdown = this.formatTime(this.mainCountdownSeconds);

        this.ngZone.run(() => this.cdr.markForCheck());
      } else {
        window.clearInterval(this.mainTimerId!);
        this.mainTimerId = null;
      }
    }, 1000);
  }

  private formatTime(totalSeconds: number) {
    const mm = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const ss = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }

  ngOnDestroy(): void {
    this.clearPopupTimer();
    if (this.mainTimerId) {
      window.clearInterval(this.mainTimerId);
      this.mainTimerId = null;
    }
  }
}