import { Component, ViewChild, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LocalStorageService } from 'angular-web-storage';
import { Router, NavigationEnd } from '@angular/router';

import { SettingsService, SidebarThemeType } from '@core/services/settings.service';
import { ThemesService } from '@core/services/themes.service';
import { MenuService } from '@core/services/menu.service';
import { ThemeType } from '@core/services/themes.service';
import { TranslatorService } from '@core/translator/translator.service';

import { DataAnalysisService } from '../../components/data-analysis/data-analysis.service';
import { EmitService } from 'app/shared/service/EmitService';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ DataAnalysisService]
})
export class HeaderComponent implements OnInit{

    q: string;
    focus = false;
    isFullscreen = false;
    searchToggled = false;
    appLoading = true;
    themes: { l: ThemeType, bg: string, nav: string, con: string }[] = [
        { l: 'A', bg: '#108ee9', nav: '#fff', con: '#f5f7fa' },
        { l: 'B', bg: '#00a2ae', nav: '#fff', con: '#f5f7fa' },
        { l: 'C', bg: '#00a854', nav: '#fff', con: '#f5f7fa' },
        { l: 'D', bg: '#f04134', nav: '#fff', con: '#f5f7fa' },
        { l: 'E', bg: '#373d41', nav: '#fff', con: '#f5f7fa' },
        { l: 'F', bg: '#108ee9', nav: '#404040', con: '#f5f7fa' },
        { l: 'G', bg: '#00a2ae', nav: '#404040', con: '#f5f7fa' },
        { l: 'H', bg: '#00a854', nav: '#404040', con: '#f5f7fa' },
        { l: 'I', bg: '#f04134', nav: '#404040', con: '#f5f7fa' },
        { l: 'J', bg: '#373d41', nav: '#404040', con: '#f5f7fa' }
    ];

    carSelects: any = [];
    staffSelects: any = [];
    curCar: any = {};
    curStaff: any;
    showToolFlag: any = true;

    @ViewChild('qIpt')
    private qIpt: any;

    constructor(
        public menu: MenuService,
        public settings: SettingsService,
        public tsServ: TranslatorService,
        private themeServ: ThemesService,
        private confirmServ: NzModalService,
        private storageServ: LocalStorageService,
        private messageServ: NzMessageService,
        private router: Router,
        private dataAnalysisService: DataAnalysisService,
        private emitService: EmitService
    ) {
    }

    ngOnInit(){
        //获取SA列表
        this.dataAnalysisService.getSalist({itemNumber:-1}).subscribe(res => {
            let list = res.List;
            if(list){
                list.forEach(element => {
                    this.staffSelects.push({value: element.UserName,label: element.UserName})
                });
                this.curStaff = this.staffSelects[0].label;
                localStorage.setItem('dashboard-curStaff',JSON.stringify(this.curStaff));
            }
        }, error => {
            console.log('获取SA列表失败！');
        })
        //获取汽车类型列表
        this.dataAnalysisService.getAllCartype().subscribe(res => {
            let list = res.List;
            if(list){
                list.forEach(element => {
                    this.carSelects.push({
                        value:element.CarBrand + element.CarType, 
                        label: element.CarBrand + element.CarType,
                        carType: element.CarType,
                        carBrand: element.carBrand,
                    })
                });
                this.curCar = this.carSelects[0];
                localStorage.setItem('dashboard-curCar',JSON.stringify(this.curCar));
            }
        }, error => {
            console.log('获取汽车类型列表失败！');
        })
        
        this.showTool();
    }

    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    toggleFullScreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
        this.isFullscreen = !screenfull.isFullscreen;
    }

    qFocus() {
        this.focus = true;
    }

    qBlur() {
        this.focus = false;
        this.searchToggled = false;
    }

    searchToggleChange() {
        this.searchToggled = true;
        this.focus = true;
        this.qIpt._el.focus();
    }

    appChange() {
        // bug: https://github.com/NG-ZORRO/ng-zorro-antd/issues/390
        setTimeout(() => this.appLoading = false, 500);
    }

    changeTheme(theme: ThemeType) {
        this.themeServ.setTheme(theme);
        this.settings.setLayout('theme', theme);
    }

    changeLang(lang: string) {
        this.tsServ.use(lang);
        this.settings.setLayout('lang', lang);
    }

    clearStorage() {
        this.confirmServ.confirm({
            title: 'Make sure clear all local storage?',
            onOk: () => {
                this.storageServ.clear();
                this.messageServ.success('Clear Finished!');
            }
        });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    showTool(){
        //判断当前页路由
        if(this.router.url == '/content/data-analysis'){
            this.showToolFlag = true;
        }else if(this.router.url == "/content/staff-manager"){
            this.showToolFlag = false;
        }else if(this.router.url == "/content/vehicleowner-manager"){
            this.showToolFlag = false;
        }

        this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe((res:any) => {
            if(res.url == '/content/data-analysis'){
                this.showToolFlag = true;
            }else if(res.url == "/content/staff-manager"){
                this.showToolFlag = false;
            }else if(res.url == "/content/vehicleowner-manager") {
                this.showToolFlag = false;
            }
        })
    }

    staffChangeEmitter(value){
        this.emitService.eventEmit.emit({type:'staff',data:value});
    }
    carChangeEmitter(value){
        this.emitService.eventEmit.emit({type:'car',data:value});
    }
}
