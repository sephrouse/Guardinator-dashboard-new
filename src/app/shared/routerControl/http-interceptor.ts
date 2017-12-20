import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpInterceptor implements Interceptor {
  constructor(private router: Router, private msg: NzMessageService){};

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    return request; 
  }
  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    if(response && response.response.status === 401){
      this.router.navigateByUrl('/login');
      this.msg.error('用户会话已过期，请重新登陆！');
    }
    return response;
  }

}