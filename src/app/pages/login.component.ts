import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoginRequest  } from './model/login.request';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as AppUtil from '../config/const';


@Component({
  templateUrl: 'login.component.html',
  styleUrls:['login.component.scss'],
  providers: [LoginService],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  showModal: boolean;
  public passwordShow: boolean;
  public UserName:string;
  public PassWord:string;

  loginRequest: LoginRequest;
  constructor(private loginService: LoginService, private router: Router, private msg: NzMessageService) {
      this.passwordShow=false;
  }


    changePasswordShow(){
        this.passwordShow=!this.passwordShow;
    }

  login(){
    this.loginRequest = {
      username: this.UserName,
      userpasswd: this.PassWord
    };

    if(this.loginRequest.username == null ||this.loginRequest.userpasswd == null){
      this.msg.error('用户名和密码不能为空');
      return;
    }
    this.loginService.login(this.loginRequest).subscribe( (res: any) => {
      if(res.code === 0){
        this.router.navigate(['/content']);
        localStorage.setItem('token', res.detail);
        localStorage.setItem('User', JSON.stringify(this.loginRequest));
      }else{
        this.msg.error('用户名或密码错误！');
      }
    });
  }

}
