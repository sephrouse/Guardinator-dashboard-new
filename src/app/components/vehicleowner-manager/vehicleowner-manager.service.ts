import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as AppUtils from '../../config/const';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as Const from '../../config/const';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class VehicleOwnerManagerService {
  constructor(public http: InterceptorService) { }


    //获取用户列表
    getUserList(TenantID): Observable<Response>{
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/user/List?TenantID='+TenantID).map((res: Response) => {
            return res.json();
        }).catch((error: Response) => {
            return Observable.throw('获取列表失败');
        });
    }


    //添加新用户
    AddUser(userProfile): Observable<Response>{
            return this.http.post(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/user/List',{
                userProfile
            }).map((res: Response) => {
                return res.json();
            }).catch((error: Response) => {
                return Observable.throw('添加新用户失败');
            });
        }

    //删除新用户
    RemoveUser(userParam): Observable<Response>{
            return this.http.post(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/user/remove',{
                userParam
            }).map((res: Response) => {
                return res.json();
            }).catch((error: Response) => {
                return Observable.throw('删除新用户失败');
            });
        }

   //锁定用户
   LockUser(userParam): Observable<Response>{
            return this.http.post(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/user/lock',{
                userParam
            }).map((res: Response) => {
                return res.json();
            }).catch((error: Response) => {
                return Observable.throw('锁定用户失败');
            });
        }

    //解锁用户
   UnlockUser(userParam): Observable<Response>{
            return this.http.post(AppUtils.BACKEND_API_ROOT_URL + '/dashboard/user/unlock',{
                userParam
            }).map((res: Response) => {
                return res.json();
            }).catch((error: Response) => {
                return Observable.throw('解锁用户失败');
            });
        }


}
