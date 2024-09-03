import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private _http: HttpClient) { }

  public getSwapi(url:string): Observable<any> {
    return this._http.get(url);
  }

  public getSwapi2(url: string, resource: string, offset: number, limit: number, byName: string, order: string): Observable<any> {
    let builtUrl = `${url}${resource}/?offset=${offset}&limit=${limit}`;
    if (byName) {
      builtUrl += `&byName=${byName}`;
    }
    if (order === 'nameMayorMinor') {
      builtUrl += '&sortByName=DESC';
    }
    else if (order === 'nameMinorMayor') {
      builtUrl += '&sortByName=ASC';
    }
    else if (order === 'createdMayorMinor') {
      builtUrl += '&sortByCreated=DESC';
    }
    else if (order === 'createdMinorMayor') {
      builtUrl += '&sortByCreated=ASC';
    }
    return this._http.get(builtUrl);
  }
  
}
