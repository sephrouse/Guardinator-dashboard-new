import { Component, OnInit} from '@angular/core';
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

  public curCar: any;
  public bar1: any;
  public pie1: any;
  public pie2: any;
  public pie3: any;
  public pie4: any;
  public pie5: any;
  public selectOption1: any;
  public selectOption2: any;
  public selectOption3: any;
  public detectResults: any;

  constructor(private dataAnalysisService: DataAnalysisService,  private emitService: EmitService) { }

  ngOnInit() {
    //获取所有车型
    this.emitService.eventEmit.subscribe((res:any)=> {
      this.setSelectOption1(res);
    })
    let localSelectOption1  = JSON.parse(localStorage.getItem('carCheckOptions'));
    this.setSelectOption1(localSelectOption1);

    //设置检测次数排名
    this.setBar1();
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

    this.selectOption2 = [
      { value: '2017', label: '2017年' },
      { value: '2016', label: '2016年' },
    ]; 
    this.selectOption3 = [
      { value: '2017', label: '2017年' },
      { value: '2016', label: '2016年' },
    ]; 
   
    //检测结果
    this.detectResults = [
      {
        type: '奥迪Q5',
        time: '9月1号 11:39 am',
        license: '沪X XXX'
      },
      {
        type: 'A4L',
        time: '9月1号 11:39 am',
        license: '沪X XXX'
      }
    ]

  }
  setSelectOption1(res){
    this.selectOption1 = res.filter(value => {
      return value.checked == true;
    });
    if(this.selectOption1 && this.selectOption1.length > 0){
      this.curCar = this.selectOption1[0].value;
    }
  }

  //设置条形图1
  setBar1(){
    this.bar1 = {
      title : {
        text: '检测次数排名',
        textStyle: {
          color: '#7f7f7f',
          fontSize: 15,
        },
      },
      tooltip : {
          trigger: 'axis'
      },
      grid: {
        left: 30,
        bottom:60,
      },
      legend: {
        data:['该车型检测次数','该车型数量'],
        right: 0,
        width: 40,
        top: 50,
      },
      calculable : true,
      xAxis : [
          {
            type : 'category',
            data : ['Q5','A6L','A3两厢','A3三厢','A4L','XXX','XXX','XXX', 'Q5','A6L','A3两厢','A3三厢','A4L','XXX','XXX','XXX','Q5','A6L','A3两厢','A3三厢','A4L','XXX','XXX','XXX'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {  
              interval:0   
            }  
          }
      ],
      yAxis : [
          {
            type : 'value',
            splitNumber: 2,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
      ],
      
      series : [
          {
            name:'该车型检测次数',
            type:'bar',
            data:[173, 125, 105, 95, 71, 60, 54, 20,173, 125, 105, 95, 71, 60, 54, 20,173, 125, 105, 95, 71, 60, 54, 20],
            barWidth: 20,
            barGap: 0,
            barCategoryGap: 40,
            itemStyle:{
              normal: {
                color: '#1792e5',
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#000'
              }
            }
          },
          {
            name:'该车型数量',
            type:'bar',
            data:[126, 89, 77, 42, 69, 61, 42, 14,126, 89, 77, 42, 69, 61, 42, 14,126, 89, 77, 42, 69, 61, 42, 14],
            barWidth: 20,
            barGap: 0,
            barCategoryGap: 40,
            itemStyle:{
              normal: {
                color: '#f58d4d',
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#000'
              }
            }
          }
      ]
    }
    //判断是否开启dataZoom
    if(true){
      this.bar1.dataZoom =  [
        {
          type: 'slider',
          show: true,
          backgroundColor: '#fff',
          fillerColor: '#ececec',
          showDataShadow: false,
          showDetail: false,
          startValue: 0,
          endValue: 10,
          bottom: 0
        }
      ]
    }
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
  
}
