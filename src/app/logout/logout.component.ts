//import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from '../service/JWT/jwt-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
   // private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private JwtAuthenticationService : JwtAuthenticationService
  ) { }

  ngOnInit() {
      this.JwtAuthenticationService.logout();
//    this.hardcodedAuthenticationService.logout();
  }

}
