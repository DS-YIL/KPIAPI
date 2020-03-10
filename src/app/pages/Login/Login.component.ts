import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import{LoginService} from './Login.service';
import { Router } from '@angular/router';
import { Employee, DynamicSearchResult, KpiEmployee } from './Login.model';
// import { constants } from 'src/app/Models/MPRConstants';
import { first } from 'rxjs/operators';
import { MENU_ITEMS } from '../pages-menu';


@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html'
})
export class LoginComponent implements OnInit {

  // constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public MprService: MprService, private router: Router, public constants: constants) { }
  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef,  private router: Router, private loginService:LoginService  ) { }
  public LoginForm: FormGroup;
  public employee: Employee;
  public LoginSubmitted: boolean = false;
  public dynamicData = new DynamicSearchResult();
  public dataSaved: boolean = false;
  allKpiEmployeeRole :KpiEmployee[]=[];

  ngOnInit() {
  this.getAllKpiEmployeeByRole();
    //this.employee = new Employees();
    localStorage.removeItem('Employee');
    localStorage.removeItem('currentUser');
    //localStorage.removeItem('EmployeeList');
    this.LoginForm = this.formBuilder.group({
      DomainId: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  getAllKpiEmployeeByRole(){
    this.loginService.getAllKpiEmployeeRole().subscribe(data=>{
      this.allKpiEmployeeRole = data;
    })
  }
  Login() {
   
    this.LoginSubmitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      const loginDetails = this.LoginForm.value;
      this.dynamicData.tableName = "Employee";
      this.dynamicData.columnValues = loginDetails.DomainId + "," + loginDetails.Password;
      this.dynamicData.searchCondition = "DomainId='" + loginDetails.DomainId + "'";
      this.loginService.ValidateLoginCredentials(this.dynamicData).subscribe(data => {
        if (data.EmployeeNo != null) {
          const role = this.allKpiEmployeeRole.filter(x=> x.EmpId ==data.EmployeeNo)
          const employeeRole = Object.assign({}, ...role);
         // localStorage.setItem("AccessList", JSON.stringify(data));
          if(employeeRole.RoleId == 1){
                  MENU_ITEMS[0].hidden = false;
                  MENU_ITEMS[1].hidden = false;
                  MENU_ITEMS[2].hidden = false;  
                  MENU_ITEMS[3].hidden = true;             
            this.LoginForm.reset();
            this.router.navigateByUrl('/KPI/Dashboard');
          }
          else{
                  MENU_ITEMS[0].hidden = true;
                  MENU_ITEMS[1].hidden = true;
                  MENU_ITEMS[2].hidden = true;  
                  MENU_ITEMS[3].hidden = false;
            this.LoginForm.reset();
            this.router.navigateByUrl('/KPI/DepartmentKPI');
          }
          // this.loginService.getAccessList(this.employee.RoleId)
          // .pipe(first())
          // .subscribe(data1 => {
          //     this.employee = data1;
          //     this.LoginForm.reset();
          //     this.router.navigateByUrl('/KPI/Dashboard');
          //    });
         
           }
         else {
           window.alert("Invalid Domain Id & Password");
           return;
         }
       });
    }
  }
}
