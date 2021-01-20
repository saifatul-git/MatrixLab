import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((err:HttpErrorResponse)=>{
            if(err.status==404){
              alert('invalid Api call')
            }else{
              if(err.status==500){
                alert('interval server')
              }else{
                if(err.status==0){
                  alert('invlid address')
                }
              }
            }
      return throwError(err)
    }));
  }
}
