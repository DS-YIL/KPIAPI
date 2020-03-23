import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Login/Login.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';

import { AuthGuard } from '../common/auth.guard';
import {KPIComponent} from './KPI/KPI.component';
import {YearlyKPIComponent} from './YearlyKPI/YearlyKPI.component';
import {GraphicalKPIComponent} from './GraphicalYearlyKPI/GraphicalYearlyKPI.component';
import {DepartmentKPIComponent} from './DepartmentKPI/DepartmentKPI.component';
import {KpiApprovalComponent} from '../kpi-approval/kpi-approval.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      // path: 'MonthlyReport',
      // component: KPIComponent,
      path: 'Login',
      component: LoginComponent,
    },
    {
      path: '',
      redirectTo: 'Login',
      pathMatch: 'full',
      // path: '',
      // redirectTo: 'MonthlyReport',
      // pathMatch: 'full',
    },
    {
      path:"KPIApproval",
      component:KpiApprovalComponent
    },
    { path: "Dashboard", component: DashboardComponent,canActivate: [AuthGuard] },  
    {path: "MonthlyReport", component:KPIComponent,canActivate: [AuthGuard]},
    {path: "YearlyKPI", component:YearlyKPIComponent,canActivate: [AuthGuard]},
    {path: "GraphicalYearlyKPI", component:GraphicalKPIComponent,canActivate: [AuthGuard]},
    {path:"DepartmentKPI", component:DepartmentKPIComponent,canActivate: [AuthGuard]}

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
