import { Component, OnInit } from '@angular/core';
import { VehicleOwnerManagerService } from './vehicleowner-manager.service';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-vehicleowner-manager',
  templateUrl: './vehicleowner-manager.component.html',
  styleUrls: ['./vehicleowner-manager.component.scss'],
  providers: [VehicleOwnerManagerService]
})
export class VehicleOwnerManagerComponent implements OnInit {

    public table01Data:any;
    public selectedYear:any;
    public years:any;
    public timesData:any;
    public passwordStyle:boolean;
    public isVisible:boolean;
    public isNewModal:boolean;
    public isModifiedModal:boolean;
    public passwordShow:boolean;
    public AddUserAccount:string;
    public AddUserName:string;
    public AddUserPhone:string;
    public AddVcode:string;
    public ModUserAccount:string;
    public ModUserName:string;
    public ModUserPhone:string;

  constructor(private staffManagerService: VehicleOwnerManagerService,
              private confirmServ: NzModalService) {
        this.table01Data=[];
        this.timesData=[];
        this.passwordStyle=false;
        this.isVisible=false;
        this.isNewModal = false;
        this.isModifiedModal = false;
        this.passwordShow=false;
        this.years=[];
        this.AddUserAccount='';
        this.AddUserName='';
        this.AddUserPhone='';
        this.AddVcode = '';

        this.selectedYear= {
            value:'2017',
            label:'2017年',
        };
  }

  ngOnInit() {
      this.table01Data = [{
          UserName: '张先生',
          UserAccount: '13407649833',
          UserPhone: '13407649833'
      },{
        UserName: '李先生',
        UserAccount: '13127810349',
        UserPhone: '13127810349'
      },{
        UserName: '李先生',
        UserAccount: '13997098858',
        UserPhone: '13997098858'
      },{
        UserName: '沈先生',
        UserAccount: '13851544580',
        UserPhone: '13851544580'
      },{
        UserName: '上官先生',
        UserAccount: '13805159002',
        UserPhone: '13805159002'
      },{
        UserName: '王女士',
        UserAccount: '13877572662',
        UserPhone: '13877572662'
      },{
        UserName: '金先生',
        UserAccount: '13851520069',
        UserPhone: '13851520069'
      },{
        UserName: '孙先生',
        UserAccount: '13813827377',
        UserPhone: '13813827377'
      },{
        UserName: '李先生',
        UserAccount: '13951966779',
        UserPhone: '13951966779'
      },{
        UserName: '陈先生',
        UserAccount: '13016998006',
        UserPhone: '13016998006'
      },{
        UserName: '赵先生',
        UserAccount: '13327800600',
        UserPhone: '13327800600'
      },{
        UserName: '朱先生',
        UserAccount: '18577857909',
        UserPhone: '18577857909'
      },{
        UserName: '韩先生',
        UserAccount: '13866703303',
        UserPhone: '13866703303'
      },{
        UserName: '范先生',
        UserAccount: '13339833583',
        UserPhone: '13339833583'
      },{
        UserName: '唐先生',
        UserAccount: '17703040607',
        UserPhone: '17703040607'
      },{
        UserName: '张先生',
        UserAccount: '16688090119',
        UserPhone: '16688090119'
      },{
        UserName: '秦先生',
        UserAccount: '13881806657',
        UserPhone: '13881806657'
      },{
        UserName: '李先生',
        UserAccount: '13933810323',
        UserPhone: '13933810323'
      },{
        UserName: '李先生',
        UserAccount: '13805050345',
        UserPhone: '13805050345'
      },{
        UserName: '曹先生',
        UserAccount: '13703492200',
        UserPhone: '13703492200'
      },{
        UserName: '钱先生',
        UserAccount: '13881802203',
        UserPhone: '13881802203'
      },{
        UserName: '孔先生',
        UserAccount: '13851503328',
        UserPhone: '13851503328'
      },{
        UserName: '郑先生',
        UserAccount: '13877970226',
        UserPhone: '13877970226'
      },{
        UserName: '李先生',
        UserAccount: '18987810348',
        UserPhone: '18987810348'
      },{
        UserName: '苗女士',
        UserAccount: '13921790114',
        UserPhone: '13921790114'
      },{
        UserName: '王先生',
        UserAccount: '13851583773',
        UserPhone: '13851583773'
      },{
        UserName: '朱先生',
        UserAccount: '17700244590',
        UserPhone: '17700244590'
      },{
        UserName: '高先生',
        UserAccount: '13913955280',
        UserPhone: '13913955280'
      },{
        UserName: '蒋先生',
        UserAccount: '13833231231',
        UserPhone: '13833231231'
      },{
        UserName: '李先生',
        UserAccount: '13913833668',
        UserPhone: '13913833668'
      },{
        UserName: '吴先生',
        UserAccount: '13820002166',
        UserPhone: '13820002166'
      }];

      for (let i = 0; i < 20; i++) {
          this.timesData.push({
              NickName   : `小赵`,
              DetectTimes    : 56+i,
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
      ];

  }
  /*修改列表中密码显示形式*/
  changePassword(){
      this.passwordStyle=!this.passwordStyle;
  }

  /*修改弹框中密码显示形式*/
  changePasswordShow(){
      this.passwordShow=!this.passwordShow;
  }

  addUser(){
    this.isModifiedModal =false;
    this.isNewModal = true;
    this.isVisible = true;
  }

  modifyAccount(data){
    this.ModUserAccount = data.UserAccount;
    this.ModUserName = data.UserName;
    this.ModUserPhone = data.UserPhone;
    this.isModifiedModal = true;
    this.isNewModal = false;
    this.isVisible = true;
  }

  /*是否删除用户*/
  deleteAccount(data){
      this.confirmServ.confirm({
          title  : '您是否确认要删除这个用户吗？',
          content: '<b>用户名：'+data.NickName+'</b>',
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
      this.isNewModal = false;
      this.isModifiedModal = false;
  }

  /*确认保存新增用户*/
  addSave(e){
        this.isVisible=false;
        this.isNewModal = false;
        this.isModifiedModal =false;

        /*提交添加用户*/
        this.AddUserAccount='';
        this.AddUserName='';
        this.AddUserPhone='';
        this.AddVcode ='';
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
