import { Component, OnInit } from '@angular/core';
import { StaffManagerService } from './staff-manager.service';

@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff-manager.component.html',
  styleUrls: ['./staff-manager.component.scss'],
  providers: [StaffManagerService]
})
export class StaffManagerComponent implements OnInit {

  constructor(private staffManagerService: StaffManagerService) { }

  ngOnInit() {
  
  }

}
