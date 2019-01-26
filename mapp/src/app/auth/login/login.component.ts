import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authSub: Subscription;

  constructor(private _authService: AuthService){}

  ngOnInit(){
    this.authSub = this._authService.getAuthStatus().subscribe(() => {
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm): void {
    if(form.invalid){ return; }
    this.isLoading = true;
    this._authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
