import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
})
export class ReportModalComponent implements OnInit {

  public engineformat = percent => `发动机\n${percent} `;
  public batteryformat = percent => `电瓶\n${percent}`;
  public coolformat = percent => `冷却系统\n${percent}`;
  public carbonformat = percent => `积碳\n${percent}`;
  public oilformat = percent => `机油\n${percent}`;
  public currentModal: any;
  public progress = {
    engine: 100,
    battery: 89,
    cool: 79,
    carbon: 49,
    oil: 29
  }
  @Input()
  public data: any;

  constructor(private modal: NzModalService,private fb: FormBuilder) {
  }

  ngOnInit() {
    
  }

  showModal(contentTpl,footerTpl){
    this.currentModal = this.modal.open({
      title: '检测结果详情',
      content: contentTpl,
      footer:footerTpl,
      wrapClassName:'report-modal'
    });
  }
  
}
