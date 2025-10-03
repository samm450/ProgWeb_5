import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser?: User;

  constructor(public route: Router) {
    let userString = localStorage.getItem(USER_KEY);
    if (userString != null) this.currentUser = JSON.parse(userString);
  }

  connect(user: User) {
    this.currentUser = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    this.route.navigate(['/home']);
  }

  disconnect() {
    this.currentUser = undefined;
    localStorage.removeItem(USER_KEY);

    this.route.navigate(['/login']);
  }
}
