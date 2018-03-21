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
    return this.http.get(Const.BACKEND_API_ROOT_URL + '/car/type')
      .map((res: Response) => {
        return res.json();
      })
      .catch((res: Response) => {
        return Observable.throw('获取所有车型失败！')
      })
  }

  //获取SA列表
  public getSalist(json: any): Observable<any>{
    return this.http.get(Const.BACKEND_API_ROOT_URL + '/employee/sa/list?ItemNumber=' + json.itemNumber)
      .map((res: Response) => {
        return res.json();
      })
      .catch((res: Response) => {
        return Observable.throw('获取SA列表失败！')
      })
  }

  //获取车型评分分析
  public getScoreAnalysis(json: any): Observable<any>{
    let url = "";
    if(json.EmpName){
      url = Const.BACKEND_API_ROOT_URL + '/score/ratio?CarBrand='+json.CarBrand + '&CarType=' + json.CarType + '&EmpName=' + json.EmpName; 
    }else{
      url = Const.BACKEND_API_ROOT_URL + '/score/ratio?CarBrand='+json.CarBrand + '&CarType=' + json.CarType; 
    }
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch((res: Response) => {
        return Observable.throw('获取车型评分分析失败');
      })
  }
}
