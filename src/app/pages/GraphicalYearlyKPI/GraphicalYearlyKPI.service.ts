import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../Service/Service';
import { KpiGraphicalModel ,DeptNameModel} from './GraphicalYearlyKPI.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GraphicalKPIService {
  constructor(private http: HttpClient, private service: Service) { }
  public url = this.service.url;
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getKpi(): Observable<KpiGraphicalModel[]> {
    return this.http.get<KpiGraphicalModel[]>(this.url + 'KPI/getAllkpi');
  }

  getDeptName(): Observable<DeptNameModel[]> {
    return this.http.get<DeptNameModel[]>(this.url + 'KPI/getDeptName');
  }

 
}
