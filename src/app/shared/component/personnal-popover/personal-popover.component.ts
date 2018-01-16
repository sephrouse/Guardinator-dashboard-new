import { Component, OnInit, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'personal-popover',
  templateUrl: './personal-popover.component.html',
  styleUrls: ['./personal-popover.component.scss'],
})
export class PersonalPopoverComponent implements OnInit {

  @Input()
  public buildStatus:string;

  ngOnInit() {
    
  }

}
