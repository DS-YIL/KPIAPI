import { Component,OnInit } from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {NbMenuService} from '@nebular/theme';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
 import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LoginService } from './pages/Login/Login.service';
//import { MprService } from './services/mpr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'KPIUI';
  chartJs = Chart;
  chartLabelPlugin = ChartDataLabels;
  constructor(private analytics:AnalyticsService,private menuService:NbMenuService,private router:Router,private _usermanage:LoginService){

  }
  ngOnInit() {
    this.chartJs.plugins.unregister(this.chartLabelPlugin);
  this.analytics.trackPageViews();
  this.menuService.onItemClick()
  .subscribe((event)=>{
    this.onContecxtItemSelection(event.item.title)
  });
  }

  onContecxtItemSelection(title){
if(title =="Logout"){
  this._usermanage.logout();
  //localStorage.removeItem('EmployeeRole');
    //this.currentUserSubject.next(null);
   // localStorage.removeItem('UserDetail');
  this.router.navigate(['/KPI/Login']);
}
  }
}
