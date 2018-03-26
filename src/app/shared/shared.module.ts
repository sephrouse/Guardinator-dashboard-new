import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularWebStorageModule } from 'angular-web-storage';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
//components
import { ReportModalComponent } from './modal/reportModal/report-modal.component';

import { CustomerFilterDropdownComponent } from './component/customer-filter-dropdown/customer-filter-dropdown.component';
import { CustomerProgressComponent } from './component/customer-progress/customer-progress.component';
import { PersonalPopoverComponent } from './component/personnal-popover/personal-popover.component';
//directives
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { FileValidator } from '@shared/fileValidator.directive';
import { FileValueAccessor } from '@shared/fileValueAccessor.directive';
//pipes
import { KeysPipe } from './pipes/keys.pipe';
import { YNPipe } from './pipes/yn.pipe';
import { ModalHelper } from './helper/modal.helper';
import { SelfdatePipe } from './pipes/selfdate.pipe';
import { ProgresscolorPipe } from './pipes/progresscolor.pipe';

//interceptor
import { InterceptorService } from 'ng2-interceptors';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './routerControl/http-interceptor';

const DIRECTIVES = [SparklineDirective,FileValidator,FileValueAccessor];
const PIPES = [ KeysPipe, YNPipe, SelfdatePipe, ProgresscolorPipe];
const HELPERS = [ ModalHelper ];
const COMPONENTS = [ReportModalComponent,CustomerFilterDropdownComponent,
                    CustomerProgressComponent,PersonalPopoverComponent];

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverURLInterceptor:HttpInterceptor){ // Add it here
    let service = new InterceptorService(xhrBackend, requestOptions);
    service.addInterceptor(serverURLInterceptor); // Add it here
    return service;
}
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularWebStorageModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [...DIRECTIVES, ...PIPES, ...COMPONENTS],
    providers: [ 
        ...HELPERS,
        //配置http拦截器
        HttpInterceptor,
        {
           provide: InterceptorService,
           useFactory: interceptorFactory,
           deps: [XHRBackend, RequestOptions, HttpInterceptor]
        }, 
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        RouterModule,
        AngularWebStorageModule,
        TranslateModule,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
