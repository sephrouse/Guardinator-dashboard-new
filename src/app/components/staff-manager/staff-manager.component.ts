import { Component, OnInit } from '@angular/core';
import { StaffManagerService } from './staff-manager.service';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff-manager.component.html',
  styleUrls: ['./staff-manager.component.scss'],
  providers: [StaffManagerService]
})
export class StaffManagerComponent implements OnInit {

    public table01Data:any;
    public selectedYear:any;
    public years:any;
    public timesData:any;
    public passwordStyle:boolean;
    public isVisible:boolean;
    public passwordShow:boolean;
    public AddUserName:string;
    public AddNickName:string;
    public AddPassWord:string;

  constructor(private staffManagerService: StaffManagerService,
              private confirmServ: NzModalService) {
        this.table01Data=[];
        this.timesData=[];
        this.passwordStyle=false;
        this.isVisible=false;
        this.passwordShow=false;
        this.years=[];
          this.AddUserName='';
          this.AddNickName='';
          this.AddPassWord='';


        this.selectedYear= {
            value:'2017',
            label:'2017年',
        };
  }

  ngOnInit() {
      for (let i = 0; i < 30; i++) {
          this.table01Data.push({
              name   : `小赵`,
              username    : '18133446655',
              password: `77ddgdkll`,
              times:67,
              lastLoginTime:'2017-09-01 10:30am',
              disable:false
          });
      }

      for (let i = 0; i < 20; i++) {
          this.timesData.push({
              name   : `小赵`,
              times    : 56+i,
          });
      }

      this.years=[
          {
              value:'2017',
              label:'2017年',
          }, {
              value:'season',
              label:'近一个季度',
          }, {
              value:'month',
              label:'近一个月',
          }
      ]

      console.log(this.table01Data)

  }
  /*修改列表中密码显示形式*/
  changePassword(){
      this.passwordStyle=!this.passwordStyle;
  }

  /*修改弹框中密码显示形式*/
  changePasswordShow(){
      this.passwordShow=!this.passwordShow;
  }

  /*是否删除用户*/
  deleteAccount(data){
      this.confirmServ.confirm({
          title  : '您是否确认要删除这个用户吗？',
          content: '<b>用户名：'+data.name+'</b>',
          onOk() {
              console.log('删除用户');
          },
          onCancel() {
          }
      });
  }

  /*关闭弹框*/
  handleCancel(e){
      this.isVisible=false;
  }

  /*确认保存新增用户*/
  addSave(e){
        this.isVisible=false;

        /*提交添加用户*/
        this.AddUserName='';
        this.AddNickName='';
        this.AddPassWord='';
  }

  /*打印*/
  printOrder() {

        const mywindow = window.open('', 'PRINT', 'height=800,width=1000');
        mywindow.document.write('<html><head><style type="text/css">@page{size:portrait;} .printtable,.printtable th,.printtable td { border: 1px solid black; padding: 5px; text-align: center;border-collapse: collapse;}.printtable { margin: 5px;margin-bottom: 0;width: -webkit-fill-available;}.col-xs-1 {width: 50px;display:inline-block;vertical-align: middle;} .col-xs-11 {width: 610px;display:inline-block;vertical-align: middle; margin-top:-10px;font-size: 12px;}  .col-xs-1{position: relative;min-height: 1px;padding-top:0px;padding-right: 5px;padding-left: 5px;font-size: 12px;vertical-align: top;}.margin-right20{ margin-right: 20px;}.margin-left20{ margin-left: 20px; }.margin-bottom20{margin-bottom: 20px;}.text-center{text-align: center;}.table-info{ padding: 10px;border: 1px solid black;margin: 5px;margin-top: 0;border-top: 0;}.flex-print{display: flex !important; align-items: center;}.space-between{justify-content: space-between}.space-round{ justify-content: space-around !important;}.word-break{ word-break: break-word; }</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('我是打印的内容');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

}



}
