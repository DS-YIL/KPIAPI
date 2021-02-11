import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {KPIEditRequest} from '../kpieditrequest/kpieditrequest.model';
import {KPIModificationApprovalService} from './kpimodificationsapproval.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-kpimodificationsapproval',
  templateUrl: './kpimodificationsapproval.component.html',
  styleUrls: ['./kpimodificationsapproval.component.scss']
})
export class KpimodificationsapprovalComponent implements OnInit {
kpieditDetails=new KPIEditRequest();
deptName:any;
employeeName:any;
reason:any;
showreqstReason:boolean=false;
rejectReason:any;
displayReject:boolean=false;
subRej:boolean=false;
showApprove:boolean=true;
showReject:boolean=true;
employee:any;
  constructor(private currentRoute: ActivatedRoute,private service:KPIModificationApprovalService,
    private toasterService:NbToastrService,) { }

  ngOnInit() {
    let reqEditDetails = this.currentRoute.snapshot.queryParams.reqEditDetails;
    let details=[];
    this.employee = JSON.parse(localStorage.getItem("EmployeeDetails"));
    if(this.employee.RoleId==5 || this.employee.RoleId==4)
    {
      this.showreqstReason=true;
      details=reqEditDetails.split(';');
      this.kpieditDetails.deptId=details[0];
      this.kpieditDetails.employeeNo=details[1];
      this.kpieditDetails.date=details[2];
      this.service.getReqDetails(reqEditDetails)
      .subscribe(
        data=>{
          if(data!="")
          {
            this.deptName=data.deptName;
            this.employeeName=data.employeeName;
            this.reason=data.reasonEdit;
          }
        });
    }
    else{
      this.showreqstReason=false;
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

  ApproveRequest(){
    let employee=JSON.parse(localStorage.getItem('Employee'));
    this.kpieditDetails.approvedBy=employee.EmployeeNo;
    this.service.approveReq(this.kpieditDetails)
    .subscribe(
      data=>{
        if(data=="success")
        {
          this.showApprove=false;
          this.showReject=false;
          debugger;
          localStorage.setItem('Employee', JSON.stringify(data));
          this.showSuccessMsg("Approved successfully");
        }
        else{
          this.showErrormsg("Error While approving KPI Modification Request");
        }
      });
  }

  RejectRequest(){
    this.showApprove=false;
this.showReject=false;
this.displayReject=true;
this.subRej=true;
  }

  onSubmit()
  {
    let employee=JSON.parse(localStorage.getItem('Employee'));
    this.kpieditDetails.rejectedBy=employee.EmployeeNo;
    this.kpieditDetails.rejectedReason=this.rejectReason;
    this.service.rejectReq(this.kpieditDetails)
    .subscribe(
      data=>{
        if(data=="success")
        {
          this.showApprove=false;
          this.showReject=false;
          this.displayReject=false;
          this.subRej=false;
debugger;
          localStorage.setItem('Employee', JSON.stringify(data));
          this.showSuccessMsg("Rejected successfully");
        }
        else{
          this.showErrormsg("Error While rejecting KPI Modification Request");
        }
      });
  }
}
