import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/pages/Login/Login.model';
import { LoginService } from 'src/app/pages/Login/Login.service';
// import { Employee } from 'src/app/Models/mpr';
// import { MprService } from 'src/app/services/mpr.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>
      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start *ngIf="currentUser">
      <ng-content select="nb-menu"></ng-content>
    </nb-sidebar>
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit {

  currentUser:Employee;
  showmenu = false;
  approverdetail:any;
  constructor(private _usermanage:LoginService){
  
    this._usermanage.currentUser.subscribe(x=> this.currentUser =x);
    // if(!this.approverdetail==undefined && this.currentUser){
      
    //   this.showmenu=true;
    // }
    
    // console.log(this.currentUser);
  }
  ngOnInit() {
    //this.approverdetail = localStorage.getItem('UserDetail');
    //  if(!this.approverdetail && this.currentUser){
      
    //   this.showmenu=true;
    // }
  // if( this.currentUser){
  //   this.showmenu=true;
  // }
  }
  
}
