import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as Const from '../../config/const';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class DataAnalysisService {
  constructor(public http: InterceptorService) { }

  //获取所有车型
  public getAllCartype(): Observable<any>{
    return this.http.get(Const.BACKEND_API_ROOT_URL + '/car/cartype?TenantID='+Const.TENANT_ID)
      .map((res: Response) => {
        return res.json();
      })
  }

  //获取车型评分分析
  public getScoreAnalysis(json: any): Observable<any>{
    return this.http.get(Const.BACKEND_API_ROOT_URL + '/car/score-analysis?TenantID='+Const.TENANT_ID 
      + '&CarBrand=' + json.CarBrand + '&CarType=' + json.CarType + '&Year=' + json.Year)
      .map((res: Response) => {
        return res.json();
      })
      .catch((res: Response) => {
        return Observable.throw('获取车型评分分析失败');
      })
  }
}
