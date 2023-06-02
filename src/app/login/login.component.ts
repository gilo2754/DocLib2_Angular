import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/JWT/jwt-authentication.service';
//import { ServerStatusComponent } from '../service/server/server.component';
import { AuthenticationRequest } from '../service/JWT/jwt-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'admin';
  password = 'admin';
  errorMessage = 'Invalid Credentials, sorry';
  invalidLogin = false;

  constructor(
    private router: Router,
    private authService: JwtAuthenticationService,
   // private serverStatusComponent: ServerStatusComponent

  ) { }

  ngOnInit() {
  }

  // This is not used in the Auth with JWT
  /*
  handleLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
    //  this.serverStatusComponent.checkServerStatus(); // Call checkServerStatus()
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
  */

  handleJWTAuthLogin() {
    const request: AuthenticationRequest = {
      email: this.username,
      password: this.password
    };
  
    this.authService.executeJWTAuthenticationService(request)
      .subscribe(
        response => {
          this.authService.setAuthenticationToken(response.token);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
          console.log(this.username);
        },
        error => {
          console.log(error);

          this.invalidLogin = true;
        }
      );
  }
  
}
