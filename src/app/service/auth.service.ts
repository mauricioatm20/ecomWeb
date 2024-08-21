import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  register(signupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest);
  }
}
