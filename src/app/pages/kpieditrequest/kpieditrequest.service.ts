import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {KPIEditRequest} from './kpieditrequest.model';
import { Router } from '@angular/router';
import { Service } from '../Service/Service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class KPIEditCreateReqService {
    constructor(private http: HttpClient,private router: Router,private service: Service) { }
    public url = this.service.url;

    KPIApproval(kpiEditReq: KPIEditRequest):Observable<any>{
      debugger;
    
      var headersforAPI = new HttpHeaders({ 'Content-Type': 'application/json' });
      headersforAPI.append("Access-Control-Allow-Origin", "true");
      return this.http.post(this.url + 'KPI/kpiEditRequest',kpiEditReq, { headers: headersforAPI }).pipe(map(res => res),
    );
    }

}
