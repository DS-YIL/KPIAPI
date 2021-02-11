import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { LoginService } from './Login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, DynamicSearchResult, KpiEmployee } from './Login.model';
// import { constants } from 'src/app/Models/MPRConstants';
import { first } from 'rxjs/operators';
import { MENU_ITEMS } from '../pages-menu';
import { isNullOrUndefined } from 'util';
import { NbAuthService } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html'
})
export class LoginComponent implements OnInit {
  deptId: any;
  userDetails:any;
  reqDetails:any;
  updatekpiDetails:any;
  private currentUserSubject: BehaviorSubject<Employee>;
  // constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public MprService: MprService, private router: Router, public constants: constants) { }
  constructor(private formBuilder: FormBuilder,private spinner: NgxSpinnerService, private route: ActivatedRoute, private authService: NbAuthService, private cdRef: ChangeDetectorRef, private router: Router, private loginService: LoginService, private toasterService: NbToastrService) { }
  public LoginForm: FormGroup;
  public employee: Employee;
  public LoginSubmitted: boolean = false;
  public dynamicData = new DynamicSearchResult();
  public dataSaved: boolean = false;
  allKpiEmployeeRole: KpiEmployee[] = [];

  showErrormsg(msg: string) {
    const status: any = 'danger';
    this.toasterService.show('Error', msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
  }
  ngOnInit() {
    //alert("Logincomponent");
    debugger;
    const employee = JSON.parse(localStorage.getItem('Employee'));
    const employeerole = JSON.parse(localStorage.getItem('EmployeeRole'));
    this.userDetails = this.route.snapshot.queryParams.userDetails;
    this.reqDetails=this.route.snapshot.queryParams.reqDetails;
    this.updatekpiDetails=this.route.snapshot.queryParams.kpiupdateDetails;
    if(this.userDetails){
    localStorage.setItem('UserDetail', JSON.stringify( this.userDetails));

    }
    if (localStorage.getItem("EmployeeDetails")) {
      this.employee = JSON.parse(localStorage.getItem("EmployeeDetails"));
      if (this.userDetails != "" && !isNullOrUndefined(this.userDetails)) {
        this.router.navigate(['/KPI/kpi-approval'], { queryParams: { userId: this.userDetails } });
        MENU_ITEMS[0].hidden = false;
    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = false;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = false;
        // this.router.navigateByUrl("/KPIApproval");
      }
      else if(this.reqDetails!="" && !isNullOrUndefined(this.reqDetails))
      {
        this.router.navigate(['/KPI/kpimodificationsapproval'], { queryParams: { reqEditDetails: this.reqDetails } });
        MENU_ITEMS[0].hidden = false;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = false;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = false;
      }
      else if(this.updatekpiDetails!="" && !isNullOrUndefined(this.updatekpiDetails))
      {
        this.router.navigate(['/KPI/Updatedkpiappform'], { queryParams: { updatekpiDetails: this.updatekpiDetails } });
        MENU_ITEMS[0].hidden = false;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = false;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = false;
      }


  else if (this.employee.RoleId == 2) {
    MENU_ITEMS[0].hidden = false;
    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = false;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = true;
    this.router.navigateByUrl('/KPI/MonthlyReport');
  }
  else if (this.employee.RoleId == 3) {
    MENU_ITEMS[0].hidden = true;
    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = true;
    this.router.navigateByUrl('/KPI/MonthlyReport');
    //this.LoginForm.reset();  
    //this.router.navigate(['/KPI/DepartmentKPI'], { queryParams: { Id: employeeRole.DeptId } });
    //this.router.navigate(['/KPI/DepartmentKPI'],{ queryParams: { deptId: employeeRole.deptId } });
  }
  else if (this.employee.RoleId == 4) {
    MENU_ITEMS[0].hidden = true;
    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = true;
    this.router.navigateByUrl('/KPI/MonthlyReport');
  }
  else if (this.employee.RoleId == 5) {
    MENU_ITEMS[0].hidden = false;
    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = false;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = false;
    this.router.navigateByUrl('/KPI/MonthlyReport');
  }

    }
    else{
      this.LoginForm = this.formBuilder.group({
        DomainId: ['', [Validators.required]],
        Password: ['', [Validators.required]],
      });
    }
// if(employee != null && employeerole != null)
// {
//   //this.currentUserSubject.next(employee);
//    //Redirecting to approval page
//    if(!this.userDetails){
//     this.getAllKpiEmployeeByRole();
    //this.employee = new Employees();

    //localStorage.removeItem('Employee');
    //localStorage.removeItem('currentUser');
    //localStorage.removeItem('Employee');
    
//     if (this.userDetails != "" && !isNullOrUndefined(this.userDetails)) {
//       this.router.navigate(['/KPI/kpi-approval'], { queryParams: { userId: this.userDetails } });
//       MENU_ITEMS[0].hidden = false;
//       MENU_ITEMS[1].hidden = false;
//       MENU_ITEMS[2].hidden = false;
//       MENU_ITEMS[3].hidden = true;
//       MENU_ITEMS[4].hidden = true;
//       MENU_ITEMS[5].hidden = true;
//       MENU_ITEMS[6].hidden = false;
//       MENU_ITEMS[7].hidden=false;
//       MENU_ITEMS[8].hidden = false;
//       MENU_ITEMS[9].hidden = true;
//       MENU_ITEMS[10].hidden = true;
//       // this.router.navigateByUrl("/KPIApproval");
//     }
//     else if(this.reqDetails!="" && !isNullOrUndefined(this.reqDetails))
//     {
//       this.router.navigate(['/KPI/kpimodificationsapproval'], { queryParams: { reqEditDetails: this.reqDetails } });
//       MENU_ITEMS[0].hidden = false;
//       MENU_ITEMS[1].hidden = false;
//       MENU_ITEMS[2].hidden = false;
//       MENU_ITEMS[3].hidden = true;
//       MENU_ITEMS[4].hidden = true;
//       MENU_ITEMS[5].hidden = true;
//       MENU_ITEMS[6].hidden = false;
//       MENU_ITEMS[7].hidden=false;
//       MENU_ITEMS[8].hidden = false;
//       MENU_ITEMS[9].hidden = true;
//       MENU_ITEMS[10].hidden = true;
//     }
//     else if(this.updatekpiDetails!="" && !isNullOrUndefined(this.updatekpiDetails))
//     {
//       //alert(this.updatekpiDetails);
//       this.router.navigate(['/KPI/Updatedkpiappform'], { queryParams: { updatekpiDetails: this.updatekpiDetails } });
//       MENU_ITEMS[0].hidden = false;
//       MENU_ITEMS[1].hidden = false;
//       MENU_ITEMS[2].hidden = false;
//       MENU_ITEMS[3].hidden = true;
//       MENU_ITEMS[4].hidden = true;
//       MENU_ITEMS[5].hidden = true;
//       MENU_ITEMS[6].hidden = true;
//       MENU_ITEMS[7].hidden=false;
//       MENU_ITEMS[8].hidden = false;
//       MENU_ITEMS[9].hidden = true;
//       MENU_ITEMS[10].hidden = true;
//     }
//       else if (employeerole.RoleId == 1) {
//         if(employeerole.EmployeeNo=="100037")
//         {
//           MENU_ITEMS[3].hidden = false;
//           MENU_ITEMS[4].hidden = false;
//           MENU_ITEMS[5].hidden = false;
//         }
//         else{
//           MENU_ITEMS[3].hidden = true;
//           MENU_ITEMS[4].hidden = true;
//           MENU_ITEMS[5].hidden = true;
//         }
//         MENU_ITEMS[0].hidden = false;
//         MENU_ITEMS[1].hidden = false;
//         MENU_ITEMS[2].hidden = false;
//         MENU_ITEMS[6].hidden = false;
//         MENU_ITEMS[7].hidden = false;
//         MENU_ITEMS[8].hidden = false;
//         MENU_ITEMS[9].hidden = true;
//         MENU_ITEMS[10].hidden = true;
//         this.router.navigateByUrl('/KPI/Dashboard');
//       }
//       else if (employeerole.RoleId == 2) {
//         MENU_ITEMS[0].hidden = true;
//         MENU_ITEMS[1].hidden = false;
//         MENU_ITEMS[2].hidden = false;
//         MENU_ITEMS[3].hidden = false;
//         MENU_ITEMS[6].hidden = true;
//         MENU_ITEMS[7].hidden = true;
//         MENU_ITEMS[4].hidden = false;
//         MENU_ITEMS[9].hidden = false;
//         // if(employeerole.iskpiEditApproved)
//         // {
//         //   MENU_ITEMS[4].hidden = false;
//         // }
//         // else{
//         //   MENU_ITEMS[4].hidden = true;
//         // }
//         MENU_ITEMS[5].hidden = false;
//         MENU_ITEMS[8].hidden = true;
//         MENU_ITEMS[10].hidden = false;
//         this.router.navigate(['/KPI/DepartmentKPI'], { queryParams: { Id: employeerole.OrgDepartmentId } });
//         //this.router.navigate(['/KPI/DepartmentKPI'],{ queryParams: { deptId: employeeRole.deptId } });
//       }
//       else if (employeerole.RoleId == 3) {
//         MENU_ITEMS[0].hidden = true;
//         MENU_ITEMS[1].hidden = false;
//         MENU_ITEMS[2].hidden = false;
//         MENU_ITEMS[3].hidden = true;
//         MENU_ITEMS[4].hidden = true;
//         MENU_ITEMS[5].hidden = true;
//         MENU_ITEMS[6].hidden = false;
//         MENU_ITEMS[7].hidden = false;
//         MENU_ITEMS[8].hidden = true;
//         MENU_ITEMS[9].hidden = true;
//         MENU_ITEMS[10].hidden = true;
//         this.router.navigateByUrl('/KPI/MonthlyReport');
//       }
    
//   }
//   else
//   {
//     this.router.navigate(['/KPI/kpi-approval'], { queryParams: { userId: this.userDetails } });
//   }
// }
// else{
//   //console.log(employee);
//   this.LoginForm = this.formBuilder.group({
//     DomainId: ['', [Validators.required]],
//     Password: ['', [Validators.required]],
//   });
// }

 
  }

  getAllKpiEmployeeByRole() {
    debugger;
    this.loginService.getAllKpiEmployeeRole().subscribe(data => {
      console.log(data);
      this.allKpiEmployeeRole = data;
      
    })
  }
  Login() {
  
debugger;
    this.LoginSubmitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      const loginDetails = this.LoginForm.value;
      this.dynamicData.tableName = "Employee";
      this.dynamicData.columnValues = loginDetails.DomainId + "," + loginDetails.Password;
      this.dynamicData.searchCondition = "DomainId='" + loginDetails.DomainId + "'";
     
      this.loginService.ValidateLoginCredentials(this.dynamicData).subscribe(data => {
        debugger;
        console.log(data);
        localStorage.setItem('EmployeeDetails', JSON.stringify(data));
        localStorage.setItem('deptId', data.OrgDepartmentId);
        if (data.EmployeeNo != null) {
          this.spinner.hide();
          this.employee = JSON.parse(localStorage.getItem("Employee"));
          console.log(this.employee);

  if (this.userDetails != "" && !isNullOrUndefined(this.userDetails)) {
            this.router.navigate(['/KPI/kpi-approval'], { queryParams: { userId: this.userDetails } });
            MENU_ITEMS[0].hidden = false;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = false;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = false;
            // this.router.navigateByUrl("/KPIApproval");
          }
          else if(this.reqDetails!="" && !isNullOrUndefined(this.reqDetails))
          {
            this.router.navigate(['/KPI/kpimodificationsapproval'], { queryParams: { reqEditDetails: this.reqDetails } });
            MENU_ITEMS[0].hidden = false;
            MENU_ITEMS[1].hidden = false;
            MENU_ITEMS[2].hidden = false;
            MENU_ITEMS[3].hidden = false;
            MENU_ITEMS[4].hidden = false;
          }
          else if(this.updatekpiDetails!="" && !isNullOrUndefined(this.updatekpiDetails))
          {
            this.router.navigate(['/KPI/Updatedkpiappform'], { queryParams: { updatekpiDetails: this.updatekpiDetails } });
            MENU_ITEMS[0].hidden = false;
            MENU_ITEMS[1].hidden = false;
            MENU_ITEMS[2].hidden = false;
            MENU_ITEMS[3].hidden = false;
            MENU_ITEMS[4].hidden = false;
          }


      if (this.employee.RoleId == 2) {
        MENU_ITEMS[0].hidden = false;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = false;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = true;
        this.router.navigateByUrl('/KPI/MonthlyReport');
      }
      else if (this.employee.RoleId == 3) {
        MENU_ITEMS[0].hidden = true;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = true;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = true;
        this.router.navigateByUrl('/KPI/MonthlyReport');
        //this.LoginForm.reset();  
        //this.router.navigate(['/KPI/DepartmentKPI'], { queryParams: { Id: employeeRole.DeptId } });
        //this.router.navigate(['/KPI/DepartmentKPI'],{ queryParams: { deptId: employeeRole.deptId } });
      }
      else if (this.employee.RoleId == 4) {
        MENU_ITEMS[0].hidden = true;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = true;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = true;
        this.router.navigateByUrl('/KPI/MonthlyReport');
      }
      else if (this.employee.RoleId == 5) {
        MENU_ITEMS[0].hidden = false;
        MENU_ITEMS[1].hidden = false;
        MENU_ITEMS[2].hidden = false;
        MENU_ITEMS[3].hidden = false;
        MENU_ITEMS[4].hidden = false;
        this.router.navigateByUrl('/KPI/MonthlyReport');
      }

        //   if (this.userDetails != "" && !isNullOrUndefined(this.userDetails)) {
        //     this.router.navigate(['/KPI/kpi-approval'], { queryParams: { userId: this.userDetails } });
        //     MENU_ITEMS[0].hidden = false;
        //     MENU_ITEMS[1].hidden = false;
        //     MENU_ITEMS[2].hidden = false;
        //     MENU_ITEMS[3].hidden = true;
        //     MENU_ITEMS[4].hidden = true;
        //     MENU_ITEMS[5].hidden = true;
        //     MENU_ITEMS[6].hidden = false;
        //     MENU_ITEMS[7].hidden=false;
        //     MENU_ITEMS[8].hidden = false;
        //     MENU_ITEMS[9].hidden = true;
        //     MENU_ITEMS[10].hidden = true;
        //     // this.router.navigateByUrl("/KPIApproval");
        //   }
        //   else if(this.reqDetails!="" && !isNullOrUndefined(this.reqDetails))
        //   {
        //     this.router.navigate(['/KPI/kpimodificationsapproval'], { queryParams: { reqEditDetails: this.reqDetails } });
        //     MENU_ITEMS[0].hidden = false;
        //     MENU_ITEMS[1].hidden = false;
        //     MENU_ITEMS[2].hidden = false;
        //     MENU_ITEMS[3].hidden = true;
        //     MENU_ITEMS[4].hidden = true;
        //     MENU_ITEMS[5].hidden = true;
        //     MENU_ITEMS[6].hidden = true;
        //     MENU_ITEMS[7].hidden=false;
        //     MENU_ITEMS[8].hidden = false;
        //     MENU_ITEMS[9].hidden = true;
        //     MENU_ITEMS[10].hidden = true;
        //   }
        //   else if(this.updatekpiDetails!="" && !isNullOrUndefined(this.updatekpiDetails))
        //   {
        //     this.router.navigate(['/KPI/Updatedkpiappform'], { queryParams: { updatekpiDetails: this.updatekpiDetails } });
        //     MENU_ITEMS[0].hidden = true;
        //     MENU_ITEMS[1].hidden = false;
        //     MENU_ITEMS[2].hidden = false;
        //     MENU_ITEMS[3].hidden = true;
        //     MENU_ITEMS[4].hidden = true;
        //     MENU_ITEMS[5].hidden = true;
        //     MENU_ITEMS[6].hidden = false;
        //     MENU_ITEMS[7].hidden=false;
        //     MENU_ITEMS[8].hidden = false;
        //     MENU_ITEMS[9].hidden = true;
        //     MENU_ITEMS[10].hidden = true;
        //   }
        //  else{
        //   debugger;
        //   const role = this.allKpiEmployeeRole.filter(x => x.EmpId == data.EmployeeNo)
        //   const employeeRole = Object.assign({}, ...role);
        //   //localStorage.setItem('EmployeeDetails', JSON.stringify(role));
        //   localStorage.setItem('EmployeeRole', JSON.stringify(data));
        //   localStorage.setItem('Employee', JSON.stringify(data));
        //   this.deptId = data.OrgDepartmentId;
        //   // localStorage.setItem("AccessList", JSON.stringify(data));
        //   console.log(employeeRole);
        //   if (data.RoleId == 1) {
        //     if(data.EmployeeNo=="100037")
        // {
        //   MENU_ITEMS[3].hidden = false;
        //   MENU_ITEMS[4].hidden = false;
        //   MENU_ITEMS[5].hidden = false;
        // }
        // else{
        //   MENU_ITEMS[3].hidden = true;
        //   MENU_ITEMS[4].hidden = true;
        //   MENU_ITEMS[5].hidden = true;
        // }
        // MENU_ITEMS[0].hidden = false;
        // MENU_ITEMS[1].hidden = false;
        // MENU_ITEMS[2].hidden = false;
        // MENU_ITEMS[6].hidden = false;
        // MENU_ITEMS[7].hidden = false;
        // MENU_ITEMS[8].hidden = false;
        // MENU_ITEMS[9].hidden = true;
        // MENU_ITEMS[10].hidden = true;
        //     this.LoginForm.reset();
        //     this.router.navigateByUrl('/KPI/MonthlyReport');
        //   }
        //   else if (data.RoleId == 2) {
        //     MENU_ITEMS[0].hidden = true;
        //     MENU_ITEMS[1].hidden = false;
        //     MENU_ITEMS[2].hidden = false;
        //     MENU_ITEMS[3].hidden = false;
            
        //     MENU_ITEMS[4].hidden = false;
        //     // if(data.iskpiEditApproved)
        //     // {
        //     //   MENU_ITEMS[4].hidden = false;
        //     // }
        //     // else{
        //     //   MENU_ITEMS[4].hidden = true;
        //     // }
        //     MENU_ITEMS[5].hidden = false;
        //     MENU_ITEMS[6].hidden = true;
        //     MENU_ITEMS[7].hidden = true;
        //     MENU_ITEMS[8].hidden = true;
        //     MENU_ITEMS[9].hidden = false;
        //     MENU_ITEMS[10].hidden = false;
        //     this.LoginForm.reset();
        //     this.router.navigate(['/KPI/DepartmentKPI'], { queryParams: { Id: data.OrgDepartmentId } });
        //     //this.router.navigate(['/KPI/DepartmentKPI'],{ queryParams: { deptId: employeeRole.deptId } });
        //   }
        //   else if (data.RoleId == 3) {
        //     MENU_ITEMS[0].hidden = true;
        //     MENU_ITEMS[1].hidden = false;
        //     MENU_ITEMS[2].hidden = false;
        //     MENU_ITEMS[3].hidden = true;
        //     MENU_ITEMS[4].hidden = true;
        //     MENU_ITEMS[5].hidden = true;
        //     MENU_ITEMS[6].hidden = false;
        //     MENU_ITEMS[7].hidden = false;
        //     MENU_ITEMS[8].hidden = true;
        //     MENU_ITEMS[9].hidden = true;
        //     MENU_ITEMS[10].hidden = true;
        //     this.router.navigateByUrl('/KPI/MonthlyReport');
        //   }
        //   // this.loginService.getAccessList(this.employee.RoleId)
        //   // .pipe(first())
        //   // .subscribe(data1 => {
        //   //     this.employee = data1;
        //   //     this.LoginForm.reset();
        //   //     this.router.navigateByUrl('/KPI/Dashboard');
        //   //    });
        //  }
        window.location.reload();

        }
        else {
          if(data.message)
           this.spinner.hide();
          this.showErrormsg(data.message);
         // window.alert("Invalid Domain Id & Password");
          return;
        }
      });
    }
  }
}
