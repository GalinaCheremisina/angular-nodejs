import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isAuthenticated = false;

  constructor(private _authService: AuthService) {}

  public ngOnInit() {
    this.isAuthenticated = this._authService.getIsAuth();
    this.subscription = this._authService.getAuthStatus()
      .subscribe((value) => {
        this.isAuthenticated = value;
      });
  }

  /**User log out */
  public onLogout(): void {
    this._authService.logOut();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
