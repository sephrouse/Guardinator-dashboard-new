import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../pages/service/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.logout();
  }

}
