import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {CommonService} from "../services/common.service"

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor( private commonService:CommonService ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string = "";
    this.commonService.getAuthentication().subscribe(res => {
      token = res;
      if(!token) {
       token= window.sessionStorage.getItem("token");
      }
    })
   
    let headers;
    if (token) {
      headers = new HttpHeaders({
        'Authorization': token,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      });
      request = request.clone({headers});
    } else {
      headers = new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      });
      request = request.clone({headers});
    }


    // if (request["body"]["showSpinner"]) {
    //   this.spinnerService.show();
    // }

    // delete request["body"]["showSpinner"];

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          
        }
        return event;
      })
    );
  }
}
