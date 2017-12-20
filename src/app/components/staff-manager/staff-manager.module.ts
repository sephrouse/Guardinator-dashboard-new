import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StaffManagerRoutes } from './staff-manager.router';
import { StaffManagerComponent } from './staff-manager.component';

@NgModule({
    declarations: [
        StaffManagerComponent,
    ],
    imports: [
        StaffManagerRoutes,
        SharedModule,
    ],
    exports: [],
})

export class StaffManagerModule { }