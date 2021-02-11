import { Component, OnInit } from '@angular/core';
import { Employee } from '../Login/Login.model';
import { Router } from '@angular/router';
import {pendingApprovalsComponentService} from './pendingforapprovals.service';
import {KPIPendingForApprovals, userDetails} from './pendingforapprovals.model';
import { NbToastrService } from '@nebular/theme';
import { kpiData } from '../createkpi/createkpi.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-pendingforapprovals',
  templateUrl: './pendingforapprovals.component.html',
  styleUrls: ['./pendingforapprovals.component.scss']
})
export class PendingforapprovalsComponent implements OnInit {
employee=new Employee();
dataList:KPIPendingForApprovals[];
reason:string="";
isRejected:boolean=false;
userData=new userDetails();
isApproved:boolean=true;
  constructor(private router: Router,
    private toasterService:NbToastrService,private service: pendingApprovalsComponentService) { }

  ngOnInit() {
    if (localStorage.getItem("Employee"))
    this.employee = JSON.parse(localStorage.getItem("Employee"));
  else
    this.router.navigateByUrl("Login");
   
    this.getPendingApprovals();
  }

  getPendingApprovals()
  {
    this.service.getPendingApprovalKPI(this.employee).subscribe(x => {
     this.dataList=x;
     console.log(this.dataList);
    });
  
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getdata());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "KPI_PendingApprovals");
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

  Approvekpi(kpidata:any, index:any)
  {
    this.userData.deptNO=kpidata.deptid;
    this.userData.departName=kpidata.deptname;
    this.userData.date=kpidata.enteredon;
    this.userData.userId=kpidata.employeeNo;
    this.userData.roleId=kpidata.roleid;
    this.userData.signedinuser=this.employee.EmployeeNo;
    this.service.ApproveKPIList(this.userData)
    .subscribe(
      data=>{
        debugger;
        this.isApproved=false;
        this.isRejected=false;
        this.showSuccessMsg('Thanks for approving KPI');
        this.getPendingApprovals();
        // this.ApproveModel=data;
        //alert("Thank you");
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

  SubmitReason()
  {
    if(this.reason!=null)
    {
      debugger;
      this.userData.reason=this.reason;
      
      this.service.RejectKpi(this.userData)
      .subscribe(
        data=>{
          this.isApproved=false;
          this.isRejected=false;
          this.showSuccessMsg('Rejection mail is successfully sent to user');
          //alert("Successfully Rejection mail was sent");
        }
      )
    }
    else{
      this.showErrormsg("Please enter the reason for rejecting KPI");
    }

  }

  Rejectkpi(kpidata:any, index:any)
  {
    this.userData.deptNO=kpidata.deptid;
    this.userData.departName=kpidata.deptname;
    this.userData.date=kpidata.enteredon;
    this.userData.userId=kpidata.employeeNo;
    this.userData.roleId=kpidata.roleid;
    this.userData.signedinuser=this.employee.EmployeeNo;
    debugger;
    this.isRejected=true;
    
  }
}
