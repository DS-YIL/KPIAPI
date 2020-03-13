import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AllKpiModel,UnsuccesKpiModel,Deptmodel,AddMonthlyKpiModel } from './DepartmentKPI.model';
import {DepartmentKPIService } from './DepartmentKPI.service';
import * as CryptoJS from 'crypto-js';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-DepartmentKPI',
  templateUrl: './DepartmentKPI.component.html',
  //styleUrls: ['./KPI.component.css']
})
export class DepartmentKPIComponent implements OnInit {

 
  dataList: AllKpiModel[];
  cols: any[];
  displayDialog: boolean;
  deptId:any;
  returnValue:boolean;
 

  constructor(
    private formBuilder: FormBuilder, chartModule: ChartModule,private departmentKPIService:DepartmentKPIService,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute,private toasterService:NbToastrService) {

      this.cols = [
        { field: 'DeptName', header: 'Department' },
        { field: 'CWQPNo', header: 'CWQP No' },
        { field: 'QualityIndices', header: 'Quality Indices' },
        { field: 'Criteria', header: 'Criteria' },
        { field: 'Measurment', header: 'Measurement' },
        { field: 'Target', header: 'Target' },
        { header: "April", editable: false },
        { field: 'March', header: "March", editable: false }
        
    ];
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.deptId = params.Id;
      console.log(this.deptId); // popular
    });
   const month = this. enableMonthColumn();
   this.cols.forEach(x=>{
    if(x.header == month){
    x.editable = true;
    }
        });
    this.loadDepartKpi(this.deptId);
   
    
  }

  enableMonthColumn(){
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
  
    var d = new Date();
    var n = month[d.getMonth()];
      
     return n;
  }

  loadDepartKpi(deptId:number) {
  this.departmentKPIService.getKpiByDeptId(deptId).subscribe(x => {
    this.dataList=x;
    console.log(this.dataList);
  });
}
 
showDialogToAdd() {
  this.displayDialog = true;
}
showErrormsg(msg:string){
  const status:any = 'danger';
  this.toasterService.show('Error',msg,{preventDuplicates:true,duplicatesBehaviour:'all',status});
}
showSuccessMsg(msg:string){
  const status:any ='success';
  this.toasterService.show(status,msg,{preventDuplicates:true,duplicatesBehaviour:'all',status});
}
validgriddata(data:AllKpiModel[]){
  data.forEach(x=>{
    if(x.March == undefined || !x.March.trim() || x.March.length ===0 ){
     this.showErrormsg('Value is required');
     return false;
    }
    else {
      return true;
    }
  })
}

// decryptData(dataList) {
//   this.deptId="123456$#@$^@1ERF";
//   try {
//     const bytes = CryptoJS.AES.decrypt(dataList, this.deptId);
//     if (bytes.toString()) {
//       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     }
//     return dataList;
//   } catch (e) {
//     console.log(e);
//   }
// }

onSubmit(){
const value = this.dataList;
 value.forEach(x=>{
  if(x.March == undefined || x.March.length ===0 ){
   this.showErrormsg('Value is required for the current month');
   return false;
  }
  else {
    this.returnValue =true;
  }
});
if(this.returnValue==true){

  this.departmentKPIService.createMontlyKpi(this.dataList).subscribe(data=>{
    this.showSuccessMsg(data);
    const month = this. enableMonthColumn();
  this.cols.forEach(x=>{
   if(x.header == month){
   x.editable = false;
   }
       });
  },
  err=>{
    this.showErrormsg(err.error.ExceptionMessage);
    
  });
  }  
}



onCancel(){
  const month = this. enableMonthColumn();
this.cols.forEach(x=>{
 if(x.header == month){
 x.editable = true;
 }
     });
}



  
  }
      











