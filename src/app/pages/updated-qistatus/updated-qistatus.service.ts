import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from '../Service/Service';
import { map } from 'rxjs/operators';
import { Employee } from '../Login/Login.model';
import { userDetails } from './updated-qistatus.model';

@Injectable({
    providedIn: 'root'
  })
  export class updatedQIstatusComponentService {
    constructor(private http: HttpClient,private router: Router,private service: Service) { }
    public url = this.service.url;
    // getPendingApprovalKPI(employee:Employee):Observable<any>{
    //     alert("KPI Approved");
    //     var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     headersforAPI.append("Access-Control-Allow-Origin", "true");
    //     return this.http.post(this.url + 'KPI/getPendingApprovalKPI',employee, { headers: headersforAPI }).pipe(map(res => res),
    //  );
    // }

    getUpdatedQIStatus(employee:Employee): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Timeout' : '120000'}) };
        return this.http.post<any>(this.url + 'KPI/getUpdatedQIStatus',employee, httpOptions);
      }
    

  }