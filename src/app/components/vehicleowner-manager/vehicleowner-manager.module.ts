import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VehicleOwnerManagerRoutes } from './vehicleowner-manager.router';
import { VehicleOwnerManagerComponent } from './vehicleowner-manager.component';

@NgModule({
    declarations: [
        VehicleOwnerManagerComponent,
    ],
    imports: [
        VehicleOwnerManagerRoutes,
        SharedModule,
    ],
    exports: [],
})

export class VehicleOwnerManagerModule { }