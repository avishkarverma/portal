import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: "root"
})


export class CommonService {
  baseURL = "http://localhost:53070";
  private authenticationSubject: BehaviorSubject<any>;
  public authenticationCurrent: Observable<any>;
  constructor(private http: HttpClient, private router: Router) {
    this.authenticationSubject = new BehaviorSubject<any>(window.sessionStorage.getItem('token'));
    this.authenticationCurrent = this.authenticationSubject.asObservable();
  }



  // setAuthentication(key: any) {
  //   window.sessionStorage.setItem('token',key)
  //   if(key){
  //   this.authentication.next(true);
  //   } else {
  //     this.authentication.next(false);
  //   }
  // }
  getAuthAsObservable() {
    return this.authenticationSubject;
  }
  setAuthentication(res) {
    this.authenticationSubject.next(res);
  }
  getAuthentication() {
    return this.authenticationSubject.value;
  }

  login(obj) {
    return <any>(
      this.http.post(
        this.baseURL + "/api/CourierDelivery/login", obj
      )
    );
  }

  addPickDetail(obj) {
    return <any>(
      this.http.post(
        this.baseURL + "/api/CourierDelivery/addPickDetails?token=" + this.getAuthentication(), {
          "PickupDetails": [obj]
      })
    );
  }

  addDeliveryDetail(obj) {
    return <any>(
      this.http.post(
        this.baseURL + "/api/CourierDelivery/addDeliveryDetails?token=" + this.getAuthentication(), {
          "DeliveryDetails": [obj]
      })
    );
  }

  getAllDetail() {
    return <any>(
      this.http.get(
        this.baseURL + "/api/CourierDelivery/displayAllOrderDetails?token=" + this.getAuthentication())
    );
  }

  

  logout() {
    window.sessionStorage.removeItem('token');
    this.authenticationSubject.next(false);
    this.router.navigate(['login']);
  }

  register(obj) {
    return <any>(
      this.http.post(
        this.baseURL + "/api/CourierDelivery/register", obj
      )
    );
  }

}
