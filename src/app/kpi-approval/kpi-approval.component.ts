import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApproveKPI} from './kpi-approval.model';
import {KPIApproveComponentService} from './kpi-approval.service';

@Component({
  selector: 'app-kpi-approval',
  templateUrl: './kpi-approval.component.html',
  styleUrls: ['./kpi-approval.component.scss']
})
export class KpiApprovalComponent implements OnInit {
ApproveModel:ApproveKPI[];
userDetails:string;
reason:string="";
isRejected:boolean=false;
cols: any[];
  constructor(  private currentRoute: ActivatedRoute,
    private service:KPIApproveComponentService) { 
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
    alert("entered");
    debugger;
    let userId = this.currentRoute.snapshot.queryParams.userId;
    this.userDetails=userId;
    let details=[];
    
    details=userId.split(';');
    this.service.KPIApproval(userId)
    .subscribe(
      data=>{
        debugger;
        this.ApproveModel=data;
      });
  }
  Approve()
  {
    this.service.ApproveKPIList(this.userDetails)
    .subscribe(
      data=>{
        debugger;
        // this.ApproveModel=data;
        alert("Thank you");
      });
  }

  SubmitReason()
  {
    this.userDetails=this.userDetails+";"+this.reason;
  this.service.RejectKpi(this.userDetails)
  .subscribe(
    data=>{
      alert("Successfully Rejection mail was sent");
    }
  )
  }

  Reject()
  {
    this.isRejected=true;
  }
}
