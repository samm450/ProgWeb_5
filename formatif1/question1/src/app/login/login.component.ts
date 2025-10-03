import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS, User } from '../user';
import { UserService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  users = USERS;
  selectedUser?: User;

  constructor(public user: UserService, public route: Router) {}

  ngOnInit() {}

  login() {
    console.log(this.selectedUser);

    if (this.selectedUser) this.user.connect(this.selectedUser);
  }
}
