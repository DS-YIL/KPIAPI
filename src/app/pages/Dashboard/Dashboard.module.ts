import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './Dashboard.component';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
//import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    TableModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
