import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { throwError } from 'rxjs'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;
  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    if(window.localStorage.getItem('token')){
      this.router.navigate(['/list'])
    }

    this.user = {
      username: '',
      password: ''
    };
  }

  login(){
    this._userService.login({
      'username': this.user.username,
      'password': this.user.password
    })
  }
}
