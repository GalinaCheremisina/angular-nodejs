import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authSub: Subscription;

  constructor(private _authService: AuthService){}

  ngOnInit(){
    this.authSub = this._authService.getAuthStatus().subscribe(response =>{
      this.isLoading = false;
    });
  }

  onSignup(form: NgForm): void {
    if(form.invalid){ return; }
    this.isLoading = true;
    this._authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
