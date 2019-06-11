import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private authSub: Subscription;

  constructor(private _authService: AuthService) {}

  public ngOnInit() {
    this.authSub = this._authService.getAuthStatus().subscribe(() => {
      this.isLoading = false;
    });
  }

  public onLogin(form: NgForm): void {
    if (form.invalid) { return; }
    this.isLoading = true;
    this._authService.login(form.value.email, form.value.password);
  }

  public ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
