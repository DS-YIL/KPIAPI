import { Component, OnInit } from '@angular/core';
import { Employee } from '../Login/Login.model';
import { Router } from '@angular/router';
import {requestedkpistatusComponentService} from './requestedkpistatus.service';
import {KPIPendingForApprovals, userDetails} from './requestedkpistatus.model';
import { NbToastrService } from '@nebular/theme';
import { kpiData } from '../createkpi/createkpi.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-requestedkpistatus',
  templateUrl: './requestedkpistatus.component.html',
  styleUrls: ['./requestedkpistatus.component.scss']
})
export class RequestedkpistatusComponent implements OnInit {

  employee=new Employee();
  dataList:KPIPendingForApprovals[];
  reason:string="";
  isRejected:boolean=false;
  userData=new userDetails();
  isApproved:boolean=true;
    constructor(private router: Router,private service:requestedkpistatusComponentService,
      private toasterService:NbToastrService,) { }
  
    ngOnInit() {
      if (localStorage.getItem("Employee"))
      this.employee = JSON.parse(localStorage.getItem("Employee"));
    else
      this.router.navigateByUrl("Login");
     
      this.getRequestedKPIStatus();
    }
  
    getRequestedKPIStatus()
    {
      this.service.getRequestedKPIStatus(this.employee).subscribe(x => {
       this.dataList=x;
       console.log(this.dataList);
      });
    
    }
  
    exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getdata());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "KPI_MonthlyStatus");
      });
  }
  
  getdata() {
    let report = [];
    for(let car of this.dataList) {
        //car.year = car.year.toString();
        report.push(car);
    }
    return report;
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
  
  
    
    showErrormsg(msg:string){
      const status:any = 'danger';
      this.toasterService.show('Error',msg,{preventDuplicates:true,duplicatesBehaviour:'all',status});
    }
    showSuccessMsg(msg:string){
      const status:any ='success';
      this.toasterService.show(status,msg,{preventDuplicates:true,duplicatesBehaviour:'all',status});
    }
  
   
  


}
