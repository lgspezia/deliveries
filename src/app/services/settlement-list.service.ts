import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Settlement } from "../models/settlement";

@Injectable({
  providedIn: 'root'
})
export class SettlementListService {

  private settlementsUrl = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/db';
  // private settlementsUrl = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {

  }

  getsettlements(): Observable<Settlement[]> {
    return this.http.get<Settlement[]>(this.settlementsUrl)
      .pipe(
        catchError(error => {
          console.log(error);
          return [];
        })
      );
  }

}
