import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DynamicSearchResult,Employee, KpiEmployee } from './Login.model';
import { map } from 'rxjs/operators';
import { Service } from '../Service/Service';
//import { constants } from '../Models/MPRConstants'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    public url = this.service.url;
    public accessTokenUrl = this.service.accessTokenUrl;
 // public url = this.constants.url;
 // public accessTokenUrl = this.constants.accessTokenUrl;
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer PPCRbsP3beI49XTuG6yKwr9RGL_Vv5-B5MEzBD6k3j6hc9VsCqfGvy14-aBIyXms0odjNS9eahOFhiv7jytiJyibh80MujGAbG44fbQTZb2SIZv2FETb-zrdL3Mw-pPRK3HjuWBZTh09soP68_EDqw91mH7-4uYgswWpTHGkJpHQcZ6NWp3J0nbdEaGDC17w6D-qWUiWIQHbWg1UXeAmwg' }) };
  private currentUserSubject: BehaviorSubject<Employee>;
  public currentUser: Observable<Employee>;
  constructor(private http: HttpClient, private service: Service) {
    //constructor(private http: HttpClient, private constants: constants) {
    this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('Employee')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Employee {
    return this.currentUserSubject.value;
  }

  getAccessList(roleId: number): Observable<any> {
    return this.http.get<any>(this.url + 'KPI/getAccessList/' + roleId, this.httpOptions);
  }

  getAllKpiEmployeeRole(): Observable<KpiEmployee[]> {
    return this.http.get<KpiEmployee[]>(this.url + 'KPI/getAllKpiEmployee');
  }
  
  ValidateLoginCredentials(search: DynamicSearchResult) {
    debugger
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + 'KPI/ValidationLoginCredential/', search)
      .pipe(map(data => {
        if (data.EmployeeNo != null) {
          //const object = Object.assign({}, ...data);
          localStorage.setItem('Employee', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return data;
      }))
  }
  getAuth_token(data1: any) {
    var data = "username=" + data1.DomainId + "&password=" + data1.Password + "&grant_type=password";
  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    return this.http.post<any>(this.accessTokenUrl, data, httpOptions);
  }

  
  logout() {
    //localStorage.removeItem('Employee');
    this.currentUserSubject.next(null);
    //window.location.reload();
  }
 

}

