import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { DataAnalysisService } from './data-analysis.service';
import * as ExportJsonExcel from 'js-export-excel';
import { EmitService } from 'app/shared/service/EmitService';
import { NzDatePickerComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss'],
  providers: [ DataAnalysisService ]
})
export class DataAnalysisComponent implements OnInit {

  public bar1: any;
  public pie1: any;
  public pie2: any;
  public pie3: any;
  public pie4: any;
  public pie5: any;
  public detectResults: any;
  public curCar: any;
  public curStaff: any;

  km: null;

  @ViewChild(NzDatePickerComponent) datePicker: NzDatePickerComponent;

  constructor(private dataAnalysisService: DataAnalysisService,  private emitService: EmitService, private el: ElementRef) { }

  ngOnInit() {
    this.curCar = JSON.parse(localStorage.getItem('dashboard-curCar'));
    this.curStaff = JSON.parse(localStorage.getItem('dashboard-curStaff'));
    this.emitService.eventEmit.subscribe((res:any)=> {
      if(res.type == 'car'){
        this.curCar = res.data;
      }else if(res.type == 'staff'){
        this.curStaff = res.data;
      }
    })
    //获取检测评分分析
    this.dataAnalysisService.getScoreAnalysis({}).subscribe((res: any) => {
      let data = res.Data;
      if(data){
        this.setPie1(data.Engine);
        this.setPie2(data.Battery);
        this.setPie3(data.Coolant);
        this.setPie4(data.Carbon);
        this.setPie5(data.Oil);
      }
    })

    //检测结果
    this.detectResults = [
      {
        id:1,
        license: '沪A 33333',
        code: 'xxxxxxx',
        km: 2300,
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '90',
        Battery: '83',
        Coolant: '32',
        Carbon: '54',
        Oil: '66'
      },
      {
        id:2,
        license: '沪B 11111',
        code: 'xxxxxxx',
        km: 8020,
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '85',
        Battery: '93',
        Coolant: '62',
        Carbon: '94',
        Oil: '54'
      },
      {
        id:3,
        license: '沪C AAAAA',
        code: 'xxxxxxx',
        km: 5700,
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '35',
        Battery: '43',
        Coolant: '12',
        Carbon: '14',
        Oil: '36'
      },
      {
        id:4,
        license: '沪D EE558',
        code: 'xxxxxxx',
        km: 12000,
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '99',
        Battery: '89',
        Coolant: '82',
        Carbon: '94',
        Oil: '96'
      },
    ]
    let _that = this;
    document.addEventListener('click', function(e){
      let target: any = e.target;
      if(target.nodeName == 'INPUT'){
        return;
      }
      _that.detectResults.forEach(element => {
        element.editKMFlag = false;
      });
    })
  }

  sort(value) {
    this.km = value;

    this.detectResults = [ ...this.detectResults.sort((a, b) => {
      if(a['km'] > b['km']) {
        return (this.km === 'ascend') ? 1 : -1;
      }else if(a['km'] < b['km']) {
        return (this.km === 'ascend') ? -1 : 1;
      }else{
        return 0;
      }
    })];
  }

  //设置饼图1
  setPie1(data){
    let seriesData =　[
      {value:data['100-90'], name:'100-90',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#1792e5'}}},
      {value:data['89-60'], name:'89-60',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f58d4d'}}},
      {value:data['59-20'], name:'59-20',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#ffc627'}}},
      {value:data['19-0'], name:'19-0',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f1594f'}}},
    ]
    this.pie1 = {
      title : {
        text: '发动机',
        textStyle: {
          color: '#000',
          fontSize: 12,
          fontWeight:500
        },
        left: '22%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemGap: 16,
          left: '55%',
          top: '15%',
          data: ['100-90','89-60','59-20','19-0']
      },
      series : [
        { 
          name: '获得该分数的次数',
          type: 'pie',
          radius : '55%',
          center: ['30%', '40%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    }
  }
  
  //设置饼图2
  setPie2(data){
    let seriesData =　[
      {value:data['100-70'], name:'100-70',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#1792e5'}}},
      {value:data['69-50'], name:'69-50',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f58d4d'}}},
      {value:data['49-20'], name:'49-20',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#ffc627'}}},
      {value:data['19-0'], name:'19-0',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f1594f'}}},
    ]
    this.pie2 = {
      title : {
        text: '电瓶',
        textStyle: {
          color: '#000',
          fontSize: 12,
          fontWeight:500
        },
        left: '23%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemGap: 16,
          left: '55%',
          top: '15%',
          data: ['100-70','69-50','49-20','19-0']
      },
      series : [
        { 
          name: '获得该分数的次数',
          type: 'pie',
          radius : '55%',
          center: ['30%', '40%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    }
  }

  //设置饼图3
  setPie3(data){
    let seriesData =　[
      {value:data['100-90'], name:'100-90',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#1792e5'}}},
      {value:data['89-60'], name:'89-60',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f58d4d'}}},
      {value:data['59-20'], name:'59-20',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#ffc627'}}},
      {value:data['19-0'], name:'19-0',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f1594f'}}},
    ]
    this.pie3 = {
      title : {
        text: '冷却散热',
        textStyle: {
          color: '#000',
          fontSize: 12,
          fontWeight:500
        },
        left: '20%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemGap: 16,
          left: '55%',
          top: '15%',
          data: ['100-90','89-60','59-20','19-0'],
      },
      series : [
        { 
          name: '获得该分数的次数',
          type: 'pie',
          radius : '55%',
          center: ['30%', '40%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    }
  }

  //设置饼图4
  setPie4(data){
    let seriesData =　[
      {value:data['100-90'], name:'100-90',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#1792e5'}}},
      {value:data['89-60'], name:'89-60',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f58d4d'}}},
      {value:data['59-20'], name:'59-20',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#ffc627'}}},
      {value:data['19-0'], name:'19-0',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f1594f'}}},
    ]
    this.pie4 = {
      title : {
        text: '进气系统',
        textStyle: {
          color: '#000',
          fontSize: 12,
          fontWeight:500
        },
        left: '23%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemGap: 16,
          left: '55%',
          top: '15%',
          data: ['100-90','89-60','59-20','19-0']
      },
      series : [
        { 
          name: '获得该分数的次数',
          type: 'pie',
          radius : '55%',
          center: ['30%', '40%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    }
  }

  //设置饼图5
  setPie5(data){
    let seriesData =　[
      {value:data['100-70'], name:'100-70',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#1792e5'}}},
      {value:data['69-50'], name:'69-50',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f58d4d'}}},
      {value:data['49-20'], name:'49-20',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#ffc627'}}},
      {value:data['19-0'], name:'19-0',label:{normal:{position: 'inside',formatter:'{d}%'}},itemStyle:{normal:{color:'#f1594f'}}},
    ]
    this.pie5 = {
      title : {
        text: '机油性能',
        textStyle: {
          color: '#000',
          fontSize: 12,
          fontWeight:500
        },
        left: '23%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemGap: 16,
          left: '55%',
          top: '15%',
          data: ['100-70','69-50','49-20','19-0']
      },
      series : [
        { 
          name: '获得该分数的次数',
          type: 'pie',
          radius : '55%',
          center: ['30%', '40%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    }
  }

  //导出成excel
  exportExcel(){
    let option={
      fileName: '检测结果',
      datas:[
        {
          sheetData:this.detectResults,
          sheetName:'sheet',
          sheetHeader:['车型','检测时间','车牌']
        }
      ]
    };

    let toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
   
  }
  
  showKMInput(e,data){
    e.stopPropagation();
    this.detectResults.forEach(element => {
      element.editKMFlag = false;
    });
    data.editKMFlag = true;
  }

  editKM(data){
    data.editKMFlag = false;
    console.log(data.km);
  }

  openPicker() {
    this.datePicker._openCalendar();
  }
}
