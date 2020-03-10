import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AllKpiModel,UnsuccesKpiModel,Deptmodel } from './DepartmentKPI.model';
import {DepartmentKPIService } from './DepartmentKPI.service';


@Component({
  selector: 'app-DepartmentKPI',
  templateUrl: './DepartmentKPI.component.html',
  //styleUrls: ['./KPI.component.css']
})
export class DepartmentKPIComponent implements OnInit {

 
  dataList: AllKpiModel[];
  cols: any[];
  displayDialog: boolean;
 
  
 

  constructor(
    private formBuilder: FormBuilder, chartModule: ChartModule,private departmentKPIService:DepartmentKPIService,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {

      
  }

  ngOnInit() {
    this.loadDepartKpi();
    this.cols = [
      { field: 'DeptName', header: 'Department' },
      { field: 'CWQPNo', header: 'CWQP No' },
      { field: 'QualityIndices', header: 'Quality Indices' },
      { field: 'Criteria', header: 'Criteria' },
      { field: 'Measurment', header: 'Measurement' },
      { field: 'Target', header: 'Target' },
      
  ];
  }

  

  loadDepartKpi() {
  this.departmentKPIService.AllKpi().subscribe(x => {
    this.dataList=x;
    console.log(this.dataList);
  });
}
 
showDialogToAdd() {
  this.displayDialog = true;
}


  
  }
      











