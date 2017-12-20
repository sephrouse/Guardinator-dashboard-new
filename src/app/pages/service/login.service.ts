import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import * as AppUtils from '../../config/const';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenNotExpired } from 'angular2-jwt';
import { InterceptorService  } from 'ng2-interceptors';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class LoginService {

  address: string;
  constructor(private http: InterceptorService, private msg: NzMessageService) {
    // console.log('正在运行loginService构造函数');
  }

  login(loginRequest): Observable<Response>{
    return this.http.post(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/usercentre/login', JSON.stringify(loginRequest)).map((res: Response) => {
        return res.json();
    }).catch((error: Response) => {
        this.msg.error('用户名或密码错误！');
        return Observable.throw('登录失败');
    });
  }

  loggedIn(){
    return tokenNotExpired();
  }

}
