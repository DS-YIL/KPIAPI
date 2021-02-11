import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApproveKPI, userDetails} from './kpi-approval.model';
import {KPIApproveComponentService} from './kpi-approval.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-kpi-approval',
  templateUrl: './kpi-approval.component.html',
  styleUrls: ['./kpi-approval.component.scss']
})
export class KpiApprovalComponent implements OnInit {
ApproveModel:ApproveKPI[];
displayDialog: boolean;
userData=new userDetails();
reason:string="";
isApproved:boolean=true;
isRejected:boolean=false;
cols: any[];
  constructor(  private currentRoute: ActivatedRoute,
    private toasterService:NbToastrService,
    private service:KPIApproveComponentService) { 
      this.cols = [
        { field: 'DeptName', header: 'Department' },
        { field: 'CWQPNo', header: 'CWQP No' },
        { field: 'QualityIndices', header: 'Quality Indices' },
        { field: 'Criteria', header: 'Criteria' },
        { field: 'Measurment', header: 'Measurement' },
        { field: 'Target', header: 'Target' },
        //{ header: "Actual", editable: false },
        { field: 'Actual', header: "Actual", editable: false }
        
    ];
    }

  ngOnInit() {
    debugger;
    let userId = this.currentRoute.snapshot.queryParams.userId;
    
    let details=[];
    
    details=userId.split(';');
    this.userData.userId=details[0];
    this.userData.departName=details[1];
    this.userData.date=details[2];
    this.service.KPIApproval(this.userData)
    .subscribe(
      data=>{
        debugger;
              this.ApproveModel=data;
              if(data[0].isApproved==true)
              {
                this.isApproved=false;
                this.isRejected=false;
                this.showSuccessMsg('KPI is already approved');
              }
              else
              {
                this.isApproved=true;
              }
      });
  }
  Approve()
  {
    this.service.ApproveKPIList(this.userData)
    .subscribe(
      data=>{
        debugger;
        this.isApproved=false;
        this.isRejected=false;
        this.showSuccessMsg('Thanks for approving KPI');
        // this.ApproveModel=data;
        //alert("Thank you");
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

  Reject()
  {
    this.isRejected=true;
    
  }
}
