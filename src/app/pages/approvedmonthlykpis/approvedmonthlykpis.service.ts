import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from '../Service/Service';
import { map } from 'rxjs/operators';
import { Employee } from '../Login/Login.model';
import { userDetails } from './approvedmonthlykpis.model';

@Injectable({
    providedIn: 'root'
  })
  export class pendingApprovalsComponentService {
    constructor(private http: HttpClient,private router: Router,private service: Service) { }
    public url = this.service.url;
   
    getapprovedKPIList(employee:Employee): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Timeout' : '120000'}) };
        return this.http.post<any>(this.url + 'KPI/getapprovedKPIList',employee, httpOptions);
      }
    
    

  }