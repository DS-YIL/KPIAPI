import { Component, OnInit } from '@angular/core';
import {KPIEditRequest} from './kpieditrequest.model';
import {KPIEditCreateReqService} from './kpieditrequest.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-kpieditrequest',
  templateUrl: './kpieditrequest.component.html',
  styleUrls: ['./kpieditrequest.component.scss']
})
export class KpieditrequestComponent implements OnInit {
employeeName:string;
deptName:string;
deptId:string;
reason:string;
showSubmit:boolean=true;
employeeNo:string;
emailId:string;
kpieditRequested:boolean=false;
kpieditRequest= new KPIEditRequest();
editRequestApproved:boolean;

  constructor(private service:KPIEditCreateReqService, private toasterService:NbToastrService) { }

  ngOnInit() {
    debugger;
    const employee = JSON.parse(localStorage.getItem('Employee'));
    const employees = JSON.parse(localStorage.getItem('EmployeeDetails'));
     console.log(employees);
    this.employeeName= employees.Name;
    this.deptName=employees.OrgDepartmentName;
    this.deptId=employees.OrgDepartmentId;
    this.employeeNo=employees.EmployeeNo;
    this.emailId=employees.EMail;
    this.kpieditRequested=employees.iskpiEditReq;
    this.editRequestApproved=employees.iskpiEditApproved;
    if(this.kpieditRequested==true && this.editRequestApproved==false)
    {
      this.showSubmit=false;
    }
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
    this.kpieditRequest.deptId=this.deptId;
    this.kpieditRequest.deptName=this.deptName;
    this.kpieditRequest.employeeName=this.employeeName;
    this.kpieditRequest.employeeNo=this.employeeNo;
    this.kpieditRequest.email=this.emailId;
    this.kpieditRequest.reasonEdit=this.reason;
    this.service.KPIApproval(this.kpieditRequest)
    .subscribe(
      data=>{
        if(data=="success")
        {
          debugger;
          this.showSubmit=false;
          const employees = JSON.parse(localStorage.getItem('EmployeeDetails'));
          employees.iskpiEditReq=true;
          localStorage.setItem('EmployeeDetails', JSON.stringify(employees));
          this.showSuccessMsg("Request has been successfully sent to CQHSE");
        }
      });
  }

}
