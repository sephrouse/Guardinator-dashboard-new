import { Component, OnInit } from '@angular/core';
import { DataAnalysisService } from './data-analysis.service';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss'],
  providers: [ DataAnalysisService ]
})
export class DataAnalysisComponent implements OnInit {

  public chart1: any;
  public echartsIntance: any;

  constructor(private dataAnalysisService: DataAnalysisService) { }

  ngOnInit() {
    this.chart1 = {
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
            data : ['Q5','A6L','A3两厢','A3三厢','A4L','XXX','XXX','XXX']
          }
      ],
      yAxis : [
          {
            type : 'value',
            splitNumber: 2,
          }
      ],
      series : [
          {
            name:'该车型检测次数',
            type:'bar',
            data:[173, 125, 105, 95, 71, 60, 54, 20],
            barWidth: 20,
            barGap: 0,
            itemStyle:{
              normal: {
                color: '#1792e5',
              }
            }
          },
          {
            name:'该车型数量',
            type:'bar',
            data:[126, 89, 77, 42, 69, 61, 42, 14],
            barWidth: 20,
            barGap: 0,
            itemStyle:{
              normal: {
                color: '#f58d4d',
              }
            }
          }
      ]
    }
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }                               
  
  ngAfterViewInit(){
    this.resizeChart();
  }

  resizeChart() {
    if (this.echartsIntance) {
      // $(this.echartsIntance._dom).height($(window).height()*0.3);
      this.echartsIntance.resize();
    }
  }
}
