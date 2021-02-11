import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {ApproveKPI, userDetails} from "./updatedkpiaprrovalform.model";
import { Router } from '@angular/router';
import { Service } from '../Service/Service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class updatedkpiComponentService {
    constructor(private http: HttpClient,private router: Router,private service: Service) { }
    public url = this.service.url;

    deletedKPI(updatedqiid:any):Observable<any>{
      debugger;
    
      var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
      headersforAPI.append("Access-Control-Allow-Origin", "true");
      return this.http.post<any>(this.url + 'KPI/deletedKPI' + '?updatedqiid=' + updatedqiid, { headers: headersforAPI }).pipe(map(res => res),
      //return this.http.post(this.url + 'KPI/deletedKPI',updatedqiid, { headers: headersforAPI }).pipe(map(res => res),
    );
    }
    // addedkpi(userData:userDetails):Observable<any>{
    //     debugger;
      
    //     var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     headersforAPI.append("Access-Control-Allow-Origin", "true");
    //     return this.http.post(this.url + 'KPI/addedKPI',userData, { headers: headersforAPI }).pipe(map(res => res),
    //   );
    //   }

    addedkpi(updatedqiid:any):Observable<any>{
      debugger;
    
      var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
      headersforAPI.append("Access-Control-Allow-Origin", "true");
      return this.http.post<any>(this.url + 'KPI/addedKPI' + '?updatedqiid=' + updatedqiid, { headers: headersforAPI }).pipe(map(res => res),
     
      //return this.http.post(this.url + 'KPI/addedKPI',updatedqiid, { headers: headersforAPI }).pipe(map(res => res),
    );
    }
      updatedkpi(updatedqiid:any):Observable<any>{
        debugger;
      
        var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
        headersforAPI.append("Access-Control-Allow-Origin", "true");
        return this.http.post<any>(this.url + 'KPI/updatedKPI' + '?updatedqiid=' + updatedqiid, { headers: headersforAPI }).pipe(map(res => res),
     
        //return this.http.post(this.url + 'KPI/updatedKPI',updatedqiid, { headers: headersforAPI }).pipe(map(res => res),
      );
      }

    // KPIApproval(userDetails:string): Observable<any> {
    //     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //     return this.http.post<any>(this.url + 'KPI/approveKPI/userId='+userDetails, httpOptions);
    //   }

      ApproveKPIList(userData:userDetails): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post(this.url + 'KPI/approveKPIList',userData, httpOptions);
      }

      RejectKpi(userData:userDetails): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post(this.url + 'KPI/rejectKPI',userData, httpOptions);
      }

// KPIApproval(userDetails:string):Observable<any>{
//     debugger;
//     let url: string;
//     debugger;
//     url = this.url+"KPI/approveKPI";
//     var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
//     headersforAPI.append("Access-Control-Allow-Origin", "true");
//     return this.http.post<any>(url,userDetails, { headers: headersforAPI }).pipe(map(res => res),
//   );
//   }
}