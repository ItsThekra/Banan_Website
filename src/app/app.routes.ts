import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { About } from './about/about'; // ممكن نخليه موجود بس مش مستخدم
import { LoginComponent } from './login/login'; // Standalone Component

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // الصفحة الأولى Login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // الصفحة بعد تسجيل الدخول
  { path: '**', redirectTo: 'login' }, // أي مسار غير معروف يرجع Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
