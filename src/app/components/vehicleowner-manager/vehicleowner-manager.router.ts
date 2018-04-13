import { Routes, RouterModule } from '@angular/router';
import { VehicleOwnerManagerComponent } from './vehicleowner-manager.component';

const routes: Routes = [
    {
        path: '', //车主管理
        component: VehicleOwnerManagerComponent,
    },
]

export const VehicleOwnerManagerRoutes = RouterModule.forChild(routes);