import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../Service/Service';
import { DeptKpiModel, kpiData } from './createkpi.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CreateKPIService {
  constructor(private http: HttpClient, private service: Service) { }
  public url = this.service.url;
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //Get kpi list by deptid
  getKPIListByDeptId(deptId: any): Observable<any> {
    return this.http.get<any[]>(this.url + 'KPI/getkpilistbyDept' + '?deptId=' + deptId);
  }

  //create kpi
  createKpi(kpidata:DeptKpiModel): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + 'KPI/AddNewKPI/', kpidata, httpOptions);
  }

  //Delete kpi
  deletekpi(kpiid:any,employeeId:any):Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any>(this.url + 'KPI/DeleteKPI/'+ '?kpiid=' + kpiid+'&empid='+employeeId);
  }

  //Save Kpi details
  SaveKPIDetails(kpidata:kpiData):Observable<any>{
    const httpOptions={ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //return this.http.post<any>(this.url + 'KPI/SaveKPI/', kpidata, httpOptions);
    return this.http.post<any>(this.url + 'KPI/UpdatedQI/', kpidata, httpOptions);
  }

}