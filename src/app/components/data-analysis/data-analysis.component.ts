import { Component, OnInit, ElementRef} from '@angular/core';
import { DataAnalysisService } from './data-analysis.service';
import * as ExportJsonExcel from 'js-export-excel';
import { EmitService } from 'app/shared/service/EmitService';

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

  constructor(private dataAnalysisService: DataAnalysisService,  private emitService: EmitService, private el: ElementRef) { }

  ngOnInit() {
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
        license: '沪X XXX',
        code: 'xxxxxxx',
        km: '5000',
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '95',
        Battery: '83',
        Coolant: '22',
        Carbon: '54',
        Oil: '66'
      },
      {
        id:2,
        license: '沪X XXX',
        code: 'xxxxxxx',
        km: '5000',
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '95',
        Battery: '83',
        Coolant: '22',
        Carbon: '54',
        Oil: '66'
      },
      {
        id:3,
        license: '沪X XXX',
        code: 'xxxxxxx',
        km: '5000',
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '95',
        Battery: '83',
        Coolant: '22',
        Carbon: '54',
        Oil: '66'
      },
      {
        id:4,
        license: '沪X XXX',
        code: 'xxxxxxx',
        km: '5000',
        time: '2017.12.01',
        birth: '2015.06.01',
        fault: 'p00...',
        Engine: '95',
        Battery: '83',
        Coolant: '22',
        Carbon: '54',
        Oil: '66'
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
        left: '20%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: '60%',
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
        left: '20%',
        top: '75%'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: '60%',
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
        text: '冷却系统',
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
          left: '60%',
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
        text: '积碳',
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
          left: '60%',
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
        text: '机油',
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
          left: '60%',
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
}
