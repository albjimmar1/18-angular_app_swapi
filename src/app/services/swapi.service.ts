import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private _http: HttpClient) { }

  public getSwapi(url:string) {
    return this._http.get(url);
  }
  
}
