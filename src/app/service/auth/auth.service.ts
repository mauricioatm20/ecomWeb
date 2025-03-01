import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserStorageService} from "../storage/user-storage.service";

const BASIC_URL = "https://34.247.92.13:8080/";
//const BASIC_URL = "https://glorious-gratitude-production.up.railway.app/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient,
    private userStorageService: UserStorageService) { }


  register(sigunupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", sigunupRequest);
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body={username, password};

    return this.http.post(BASIC_URL + 'authenticate', body,{headers, observe: 'response'}).pipe(
      map((res) => {
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }

  getOrderByTrackingId(trackingId: number):Observable<any>{
    return this.http.get(BASIC_URL + `order/${trackingId}`)
  }
}
