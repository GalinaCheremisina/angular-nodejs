import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthData } from '../model/auth-data.model';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private authStatus = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  /**User sign up */
  public createUser(email: string, password: string): void {
    const authData: AuthData = { email: email, password: password };
    this._http.post(BACKEND_URL + 'signup', authData)
      .subscribe(
        () => { this._router.navigate(['/auth/login']); },
        () => { this.authStatus.next(false); },
      );
  }

  /**User login */
  public login(email: string, password: string): void {
    const authData: AuthData = { email: email, password: password };
    this._http.post<{ token: string, expiresIn: number, userId: string }>(
      BACKEND_URL + 'login',
      authData,
    )
      .subscribe(
        (response) => {
          this.token = response.token;
          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.userId = response.userId;
            this.authStatus.next(true);
            this.isAuthenticated = true;
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(response.token, expirationDate, this.userId);
            this._router.navigate(['/']);
          }
        },
        (error) => { this.authStatus.next(false); },
      );
  }

  public autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.authStatus.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  /**Log out */
  public logOut(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
    this._router.navigate(['/']);
    this.clearAuthData();
    this.userId = null;
  }

  /**Get the token */
  public getToken(): string {
    return this.token;
  }

  /**Get user's id */
  public getUserId(): string {
    return this.userId;
  }

  /**Get user's status */
  public getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  /**Get user's status */
  public getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  private setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }

  private getAuthData(): { token: string, userId: string, expirationDate: Date } {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      userId: userId,
      expirationDate: new Date(expirationDate),
    };
  }
}
