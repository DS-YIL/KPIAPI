import { Component, OnInit } from '@angular/core';
import { KPIService } from '../KPI/KPI.service';
import { FormBuilder } from '@angular/forms';
import { KpiModel ,TopKpiModel} from '../KPI/KPI.model';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  data: TopKpiModel[]=[];
  dataList: TopKpiModel[];
  cols: any[];
  displayDialog: boolean = false;
  constructor(
    private kpiService: KPIService, private formBuilder: FormBuilder) {

   
  }

  ngOnInit() {
    this.loadKpiReport();
    this.cols = [
      { field: 'DeptName', header: 'Department' },
      { field: 'CWQPNo', header: 'CWQP No' },
      { field: 'QualityIndices', header: 'Quality Indices' },
      { field: 'Criteria', header: 'Criteria' },
      { field: 'Measurment', header: 'Measurement' },
      { field: 'Target', header: 'Target' },
      // { field: 'July', header: 'Actual' }
  ];
  }
  showDialog() {
    this.displayDialog = true;
}
  // loadKpiReport() {
  //   this.kpiService.getAllKpi().subscribe(x => {
  //    // this.data = x;
  //     this.dataList=x;
  //   });
  // }

  loadKpiReport() {
    this.kpiService.getAllTopKpi().subscribe(x => {
     // this.data = x;
      this.dataList=x;
      console.log(this.dataList);
    });
  }
}
