import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DataAnalysisComponent } from './data-analysis.component';
import { DataAnalysisRoutes } from './data-analysis.router';
import { AngularEchartsModule } from 'ngx-echarts';

@NgModule({
    declarations: [
        DataAnalysisComponent,
    ],
    imports: [
        DataAnalysisRoutes,
        SharedModule,
        AngularEchartsModule
    ],
    exports: [],
})

export class DataAnalysisModule { }