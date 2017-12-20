import { Routes, RouterModule } from '@angular/router';
import { StaffManagerComponent } from './staff-manager.component';

const routes: Routes = [
    {
        path: '', //职员管理
        component: StaffManagerComponent,
    },
]

export const StaffManagerRoutes = RouterModule.forChild(routes);