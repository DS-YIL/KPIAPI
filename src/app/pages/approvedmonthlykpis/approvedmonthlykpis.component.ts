import { Component, OnInit } from '@angular/core';
import { Employee } from '../Login/Login.model';
import { Router } from '@angular/router';
import {pendingApprovalsComponentService} from './approvedmonthlykpis.service';
import {KPIPendingForApprovals, userDetails} from './approvedmonthlykpis.model';
import { NbToastrService } from '@nebular/theme';
import { kpiData } from '../createkpi/createkpi.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-approvedmonthlykpis',
  templateUrl: './approvedmonthlykpis.component.html',
  styleUrls: ['./approvedmonthlykpis.component.scss']
})
export class ApprovedmonthlykpisComponent implements OnInit {

  employee=new Employee();
dataList:KPIPendingForApprovals[];
reason:string="";
isRejected:boolean=false;
userData=new userDetails();
isApproved:boolean=true;
  constructor(private router: Router, private service:pendingApprovalsComponentService,
    private toasterService:NbToastrService,) { }

  ngOnInit() {
    if (localStorage.getItem("Employee"))
    this.employee = JSON.parse(localStorage.getItem("Employee"));
  else
    this.router.navigateByUrl("Login");
   
    this.getapprovedKPIList();
  }

  getapprovedKPIList()
  {
    this.service.getapprovedKPIList(this.employee).subscribe(x => {
     this.dataList=x;
     console.log(this.dataList);
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

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getdata());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "KPI_MonthlyApproved");
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


}
