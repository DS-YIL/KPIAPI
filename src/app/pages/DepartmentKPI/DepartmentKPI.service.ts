import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../Service/Service';
import {AllKpiModel,UnsuccesKpiModel } from './DepartmentKPI.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartmentKPIService {
  constructor(private http: HttpClient, private service: Service) { }
  public url = this.service.url;
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  AllKpi(): Observable<AllKpiModel[]> {
    return this.http.get<AllKpiModel[]>(this.url + 'KPI/getAllkpi');
  }

 

  getUnsucessfullKpi(kpiId: any): Observable<any> {
    return this.http.get<any>(this.url + 'KPI/getUnsucessfullKpiById' + '?kpiId=' + kpiId);
  }


  
}
