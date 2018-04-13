import { Routes, RouterModule }  from '@angular/router';
import { CanActivateGuard } from './shared/routerControl/can-activate-guard';
import { SelectivePreloadingStrategy } from './shared/routerControl/selective-preloading-strategy';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'content',
        component: LayoutComponent,
        canActivateChild: [CanActivateGuard],
        children: [
            {
              path: '', // 数据分析
              redirectTo:'data-analysis',
              pathMatch: 'full'
            },
            {
              path:'data-analysis',
              loadChildren: './components/data-analysis/data-analysis.module#DataAnalysisModule',
              data: {
                preload: true
              }
            },
            {
              path: 'staff-manager', // 员工管理
              loadChildren: './components/staff-manager/staff-manager.module#StaffManagerModule',
              data: {
                preload: true
              }
            },
            {
              path: 'vehicleowner-manager', // 车主管理
              loadChildren: './components/vehicleowner-manager/vehicleowner-manager.module#VehicleOwnerManagerModule',
              data: {
                preload: true
              }
            }
          ]
    },
    { path: '**', redirectTo: 'login' }
];

export const AppRoute = RouterModule.forRoot(rootRouterConfig, { preloadingStrategy: SelectivePreloadingStrategy, useHash: true });
