import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.register(this.registerUserData).subscribe(
      response => {
        localStorage.setItem('eventPubToken', response.token);
        this._router.navigate(['/special']);
      },
      error => {
        console.log('Error: ', error);
      });
  }

}
