import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../Service/Service';
import { updatedkpiComponentService } from './updatedkpiaprrovalform.service';
import { NbToastrService } from '@nebular/theme';
import { ApproveKPI, userDetails } from './updatedkpiaprrovalform.model';
import { identifierModuleUrl } from '@angular/compiler';
import { Employee } from '../Login/Login.model';

@Component({
  selector: 'app-updatedkpiaprrovalform',
  templateUrl: './updatedkpiaprrovalform.component.html',
  styleUrls: ['./updatedkpiaprrovalform.component.scss']
})
export class UpdatedkpiaprrovalformComponent implements OnInit {
  employee=new Employee();
  deletedKPIModel:ApproveKPI[];
  addkpiModel:ApproveKPI[];
  UpdatedkpiMaodel:ApproveKPI[];
displayDialog: boolean;
userData=new userDetails();
reason:string="";
isApproved:boolean=true;
isRejected:boolean=false;
docno:any;
cols: any[];
kpidetails:any;
  constructor(  private currentRoute: ActivatedRoute,
    private toasterService:NbToastrService, private router:Router,
    private service:updatedkpiComponentService) { 
      this.cols = [
        { field: 'DeptName', header: 'Department' },
        { field: 'CWQPNo', header: 'CWQP No' },
        { field: 'QualityIndices', header: 'Quality Indices' },
        { field: 'Criteria', header: 'Criteria' },
        { field: 'Measurment', header: 'Measurement' },
        { field: 'Purpose', header: 'Purpose' },
        { field: 'Target', header: 'Target' },
        //{ header: "Actual", editable: false },
        { field: 'Actual', header: "Actual", editable: false }
        
    ];
    }

  ngOnInit() {
    if (localStorage.getItem("Employee"))
    this.employee = JSON.parse(localStorage.getItem("Employee"));
  else
    this.router.navigateByUrl("Login");
 
    let updatedkpiDetails = this.currentRoute.snapshot.queryParams.updatekpiDetails;
    this.currentRoute.params.subscribe(params => {
      if (params["kpiupdateDetails"]) {
        var data=params["kpiupdateDetails"];
         this.kpidetails=data.split('-');
        updatedkpiDetails = this.kpidetails[0];
      }
    });
    let details=[];
    debugger;
    if(this.employee.RoleId==4 || this.employee.RoleId==5)
    {
      this.isApproved=true;
    }
    else{
      this.isApproved=false;
    }
    //isApproved
    // details=updatedkpiDetails.split(';');
    // this.userData.userId=details[0];
    // this.userData.departName=details[1];
    // this.userData.updatedqiid=details[2];
    // this.userData.date=details[3];
    this.service.deletedKPI(updatedkpiDetails)
    .subscribe(
      data=>{
        debugger;
             
              if(data!=[])
              {
                this.deletedKPIModel=data;
                this.docno=this.deletedKPIModel[0].DocNo;
              }
            
              // if(data[0].isApproved==true)
              // {
              //   this.isApproved=false;
              //   this.isRejected=false;
              //   this.showSuccessMsg('KPI is already approved');
              // }
              // else
              // {
              //   this.isApproved=true;
              // }
      });

      this.service.addedkpi(updatedkpiDetails)
      .subscribe(
        data=>{
          debugger;
          if(data!=[])
          {
            this.addkpiModel=data;
                this.docno=this.addkpiModel[0].DocNo;
          }
               
                // if(data[0].isApproved==true)
                // {
                //   this.isApproved=false;
                //   this.isRejected=false;
                //   this.showSuccessMsg('KPI is already approved');
                // }
                // else
                // {
                //   this.isApproved=true;
                // }
        });
    
        this.service.updatedkpi(updatedkpiDetails)
    .subscribe(
      data=>{
        debugger;
              this.UpdatedkpiMaodel=data;
              this.docno=this.UpdatedkpiMaodel[0].DocNo;
              if(data[0].isBUHeadApproved==true)
              {
                this.isApproved=false;
                this.isRejected=false;
                this.showSuccessMsg('KPI is already approved');
              }
              else
              {
                //this.isApproved=true;
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

  updatedqiststus()
  {
    if(this.kpidetails[1]=='status')
    {
      this.router.navigate(['/KPI/UpdatedQIStatus']);
    }
    else{
      this.router.navigate(['/KPI/UpdatedQIFormStatus']);
    }
    
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
