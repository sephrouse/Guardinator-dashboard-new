import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as Const from '../../config/const';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class DataAnalysisService {
  constructor(public http: InterceptorService) { }

  public getDashboardInfo(json: any):Observable<any>{

    return this.http.post(Const.BACKEND_API_ROOT_URL + '/getDashboardInfo',{})
      .map((res: Response) => {
        return res.json();
      });
  }


}
