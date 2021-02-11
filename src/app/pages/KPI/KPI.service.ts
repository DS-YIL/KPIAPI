import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../Service/Service';
import { KpiModel,TopKpiModel ,InsertTopKpiModel,DeptNameModel, kpiMaster} from './KPI.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KPIService {
  constructor(private http: HttpClient, private service: Service) { }
  public url = this.service.url;
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getAllKpi(): Observable<KpiModel[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Timeout' : '120000'}) };
    return this.http.get<KpiModel[]>(this.url + 'KPI/getAllkpi',httpOptions);
  }

  getAllTopKpi(): Observable<TopKpiModel[]> {
    return this.http.get<TopKpiModel[]>(this.url + 'KPI/getTopkpi');
  }

  getmgtkpi():Observable<TopKpiModel[]> {
    return this.http.get<TopKpiModel[]>(this.url + 'KPI/getmgntkpi');
  }

  getDeptName(): Observable<DeptNameModel[]> {
    return this.http.get<DeptNameModel[]>(this.url + 'KPI/getDeptName');
  }
  submitmgtkpi(mgtkpi:TopKpiModel[]): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Timeout' : '120000'}) };
    return this.http.post<any>(this.url + 'KPI/submitmgtkpi', mgtkpi, httpOptions);
  }
  resetkpi(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Timeout' : '120000'}) };
    return this.http.post<any>(this.url + 'KPI/resetkpi', httpOptions);
  }

  createTopKPIYearly(insertTopKpiModel: InsertTopKpiModel): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Timeout' : '120000'}) };
    return this.http.post<any>(this.url + 'KPI/AddCheckedKPI', insertTopKpiModel, httpOptions);
  }

  getUnsucessfullKpi(kpiId: any): Observable<any> {
    return this.http.get<any>(this.url + 'KPI/getUnsucessfullKpiById' + '?kpiId=' + kpiId);
  }


  createMontlyKpi(addMonthlyKpiModel: kpiMaster[]): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + 'KPI/AddMonthlyKPI/', addMonthlyKpiModel, httpOptions);
  }

  AddMonthlyKPIAdmin(addMonthlyKpiModel: KpiModel[]): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Timeout' : '120000' }) };
    return this.http.post<any>(this.url + 'KPI/AddMonthlyKPIAdmin/', addMonthlyKpiModel, httpOptions);
  }
  
}
