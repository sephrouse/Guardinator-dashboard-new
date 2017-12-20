import { Routes, RouterModule } from '@angular/router';
import { DataAnalysisComponent } from './data-analysis.component';

const routes: Routes = [
    {
        path: '', //数据分析
        component: DataAnalysisComponent,
    },
]

export const DataAnalysisRoutes = RouterModule.forChild(routes);