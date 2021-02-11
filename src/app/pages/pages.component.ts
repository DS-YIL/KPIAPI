import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { MENU_ITEMS } from './pages-menu';
import {Employee} from './Login/Login.model';
import { from } from 'rxjs';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
    <p-toast [style]="{marginTop: '60px'}"  [showTransitionOptions]="'1000ms'" [hideTransitionOptions]="'1000ms'"></p-toast>
  `,
})
export class PagesComponent {
  constructor(private router: Router) { }
  public employee: Employee;
  menu = MENU_ITEMS;
  ngOnInit() {
    //alert("Pagescomponent");
    //ui-table-scrollable-body
   debugger;
   if (localStorage.getItem("Employee")) {
     this.employee = JSON.parse(localStorage.getItem("Employee"));
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
    }

    else
      this.router.navigateByUrl("Login");
    
   }
}
