import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AllKpiModel,UnsuccesKpiModel,Deptmodel,AddMonthlyKpiModel, QKUserModel } from './DepartmentKPI.model';
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
  QKUserList: QKUserModel[];
  cols: any[];
  displayDialog: boolean;
  deptId:any;
  returnValue:boolean;
  showDepartmentDropDown = false;
  selectedDept:any;
  showSubmitButton = false;

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
        { field: 'March', header: "March", editable: false },
        { field: "April",header: "April", editable: false },  
        { field: "May",header: "May", editable: false },       
        { field: 'June', header: "June", editable: false },
        //{ field: 'July', header: "July", editable: false },
        // { field: 'August', header: "August", editable: false },
        // { field: 'September', header: "September", editable: false },
        // { field: 'October', header: "October", editable: false },
        // { field: 'November', header: "November", editable: false },
        // { field: 'December', header: "December", editable: false },
        // { field: 'January', header: "January", editable: false },
        // { field: 'February', header: "February", editable: false }
        
    ];
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.deptId = params.Id;
      console.log(this.deptId); // popular
    });
    const employee = JSON.parse(localStorage.getItem('Employee'));
    console.log(employee);
   
    this.loadDepartKpi(this.deptId);
    this.loadQKUserByEmpId(employee.EmployeeNo)
   
    
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
loadQKUserByEmpId(empNo:any) {
  this.departmentKPIService.getQKUserByEmpId(empNo).subscribe(x => {
    this.QKUserList=x;
    if(this.QKUserList.length>1){
      this.showDepartmentDropDown=true;
    }
    console.log(this.QKUserList);
  });
}
onSelectDpt(event){
  this.selectedDept = event.target.value;
  this.dataList = [];
  this.loadDepartKpi(this.selectedDept);

}
editKPI(){
  this.showSubmitButton = true;
  const month = this. enableMonthColumn();
   this.cols.forEach(x=>{
    if(x.header == month){
    x.editable = true;
    }
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
      











