import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class Service {
  //public url = 'http://10.29.15.68:83/Api/';
   public url = 'http://localhost:63794/Api/';

  //public accessTokenUrl = "http://10.29.15.183:90/token";
  public accessTokenUrl = "http://localhost:63794/token";
 }

