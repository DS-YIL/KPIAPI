import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {KPIEditRequest} from "../kpieditrequest/kpieditrequest.model";
import { Router } from '@angular/router';
import { Service } from '../Service/Service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class KPIModificationApprovalService {
    constructor(private http: HttpClient,private router: Router,private service: Service) { }
    public url = this.service.url;

    getReqDetails(reqDetails:any):Observable<any>{
      debugger;
    
      var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
      headersforAPI.append("Access-Control-Allow-Origin", "true");
      return this.http.get<any>(this.url + 'KPI/getReqDetails' + '?reqDetails=' + reqDetails);
      
    }

    approveReq(reqDetails:KPIEditRequest):Observable<any>{
        var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
        headersforAPI.append("Access-Control-Allow-Origin", "true");
        return this.http.post(this.url + 'KPI/approveKPIReq',reqDetails, { headers: headersforAPI }).pipe(map(res => res),
      );
    }
    rejectReq(reqDetails:KPIEditRequest):Observable<any>{
      var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
      headersforAPI.append("Access-Control-Allow-Origin", "true");
      return this.http.post(this.url + 'KPI/rejectKPIReq',reqDetails, { headers: headersforAPI }).pipe(map(res => res),
    );
  }
  }