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
import {KpiApprovalComponent} from './kpi-approval/kpi-approval.component';
import {CreatekpiComponent} from './createkpi/createkpi.component';
import {KpieditrequestComponent} from './kpieditrequest/kpieditrequest.component';
import {KpimodificationsapprovalComponent} from './kpimodificationsapproval/kpimodificationsapproval.component';
import {PendingforapprovalsComponent} from './pendingforapprovals/pendingforapprovals.component';
import {UpdatedkpiaprrovalformComponent} from './updatedkpiaprrovalform/updatedkpiaprrovalform.component';
import {ApprovedmonthlykpisComponent} from './approvedmonthlykpis/approvedmonthlykpis.component';
import {PendingkpiapprovalsComponent} from './pendingkpiapprovals/pendingkpiapprovals.component';
import {MonthlykpistatusComponent} from './monthlykpistatus/monthlykpistatus.component';
import {RequestedkpistatusComponent} from './requestedkpistatus/requestedkpistatus.component';
import { UpdatedQIStatusComponent } from './updated-qistatus/updated-qistatus.component';
import {UpdatedQIFormstatusComponent} from './updated-qiformstatus/updated-qiformstatus.component';
import { updatedQIstatusComponentService } from './updated-qistatus/updated-qistatus.service';

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
    // {
    //   path:"KPIApproval",
    //   component:KpiApprovalComponent
    // },
    { path: "Dashboard", component: DashboardComponent,canActivate: [AuthGuard] },  
    {path: "MonthlyReport", component:KPIComponent,canActivate: [AuthGuard]},
    {path: "YearlyKPI", component:YearlyKPIComponent,canActivate: [AuthGuard]},
    {path: "GraphicalYearlyKPI/:deptid/:year", component:GraphicalKPIComponent,canActivate: [AuthGuard]},
    {path:"DepartmentKPI", component:DepartmentKPIComponent,canActivate: [AuthGuard]},
    {path:"kpi-approval", component:KpiApprovalComponent,canActivate: [AuthGuard]},
    {path:"CreateKPI", component:CreatekpiComponent, canActivate:[AuthGuard]},
    {path:"CreateKPIReqForm", component:KpieditrequestComponent, canActivate:[AuthGuard]},
    {path:"kpimodificationsapproval", component:KpimodificationsapprovalComponent, canActivate:[AuthGuard]},
    {path:"pendingApprovals",component:PendingforapprovalsComponent, canActivate:[AuthGuard]},
    {path:"Updatedkpiappform/:kpiupdateDetails",component:UpdatedkpiaprrovalformComponent,canActivate:[AuthGuard]},
    {path:"approvedKPIs", component:ApprovedmonthlykpisComponent, canActivate:[AuthGuard]},
    {path:"pendingKPIs", component:PendingkpiapprovalsComponent, canActivate:[AuthGuard]},
    {path:"monthlykpistatus", component:MonthlykpistatusComponent, canActivate:[AuthGuard]},
    {path:"requestedkpistatus", component:RequestedkpistatusComponent, canActivate:[AuthGuard]},
    {path: "UpdatedQIStatus", component:UpdatedQIStatusComponent, canActivate:[AuthGuard]},
    {path:"UpdatedQIFormStatus", component:UpdatedQIFormstatusComponent, canActivate:[AuthGuard]}
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
