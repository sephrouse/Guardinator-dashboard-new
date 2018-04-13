import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@core/services/settings.service';
import { LoginService } from '../../pages/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
    public user: any;

    constructor(public settings: SettingsService, public msgSrv: NzMessageService, public router: Router, private loginService: LoginService) {
    }

    ngOnInit(){
      let userString = localStorage.getItem('User');
      if(userString && userString !== ''){
        this.user = JSON.parse(userString);
      }
    }

    logout(){
      this.router.navigateByUrl('/logout');
    }
}
