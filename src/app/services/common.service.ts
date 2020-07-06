import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})


export class CommonService {
  baseURL = "http://localhost:53070";
  constructor(private http: HttpClient) { }
  private authentication = new Subject<any>();

  setAuthentication(key: any) {
    window.sessionStorage.setItem('token',key)
    if(key){
    this.authentication.next(true);
    } else {
      this.authentication.next(false);
    }
  }

  getAuthentication() {
    return this.authentication.asObservable();
  }

  login(obj) {
    return <any>(
      this.http.post(
        this.baseURL + "/api/CourierDelivery/login",obj
      )
    );
  }

  register(obj) {
    return <any>(
      this.http.post(
        this.baseURL + "/api/CourierDelivery/register",obj
      )
    );
  }

}
