import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectfilterPipe } from '../common/selectfilter.pipe';
import { LoginComponent } from './Login/Login.component';
import { ConfirmationDialogComponent } from '../common/confirmationdialog/confirmation-dialog.component';
import { KPIComponent } from './KPI/KPI.component';
import {ChartModule} from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { DashboardModule } from './Dashboard/Dashboard.module';
import {YearlyKPIComponent} from './YearlyKPI/YearlyKPI.component';
import {GraphicalKPIComponent} from './GraphicalYearlyKPI/GraphicalYearlyKPI.component';
import {DepartmentKPIComponent} from './DepartmentKPI/DepartmentKPI.component'
import { ChartsModule } from 'ng2-charts';
import { KpiApprovalComponent } from './kpi-approval/kpi-approval.component';
import { CreatekpiComponent } from './createkpi/createkpi.component';
import {CardModule} from 'primeng/card';
import { KpieditrequestComponent } from './kpieditrequest/kpieditrequest.component';
import { KpimodificationsapprovalComponent } from './kpimodificationsapproval/kpimodificationsapproval.component';
import { PendingforapprovalsComponent } from './pendingforapprovals/pendingforapprovals.component';
import { UpdatedkpiaprrovalformComponent } from './updatedkpiaprrovalform/updatedkpiaprrovalform.component';
import { ApprovedmonthlykpisComponent } from './approvedmonthlykpis/approvedmonthlykpis.component';
import { PendingkpiapprovalsComponent } from './pendingkpiapprovals/pendingkpiapprovals.component';
import { MonthlykpistatusComponent } from './monthlykpistatus/monthlykpistatus.component';
import { RequestedkpistatusComponent } from './requestedkpistatus/requestedkpistatus.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { UpdatedQIStatusComponent } from './updated-qistatus/updated-qistatus.component';
import { UpdatedQIFormstatusComponent } from './updated-qiformstatus/updated-qiformstatus.component';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    CardModule,
    NbMenuModule,
    DashboardModule,
    FormsModule ,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ListboxModule,
    DialogModule,
    FileUploadModule,
    TooltipModule,
    RadioButtonModule,
    InputSwitchModule,
    CheckboxModule,
    CalendarModule,
    DataViewModule,
    ToastModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmDialogModule,
    MatExpansionModule,
    NbMenuModule,
    ChartModule,
    DropdownModule,
    NbCardModule,
    ChartsModule,
    IntlModule,
    DateInputsModule 

  ],
  declarations: [
    PagesComponent,
    SelectfilterPipe,
    KPIComponent,
    YearlyKPIComponent,
    GraphicalKPIComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    DepartmentKPIComponent,
    KpiApprovalComponent,
    CreatekpiComponent,
    KpieditrequestComponent,
    KpimodificationsapprovalComponent,
    PendingforapprovalsComponent,
    UpdatedkpiaprrovalformComponent,
    ApprovedmonthlykpisComponent,
    PendingkpiapprovalsComponent,
    MonthlykpistatusComponent,
    RequestedkpistatusComponent,
    UpdatedQIStatusComponent,
    UpdatedQIFormstatusComponent
   
    
    
  ],
  bootstrap:    [ KPIComponent ],
  providers:[MessageService, ConfirmationService],
  entryComponents:[ConfirmationDialogComponent]
})
export class PagesModule {
}
