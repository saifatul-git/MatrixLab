import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError} from 'rxjs';
import { BehaviorSubject,Subject } from 'rxjs';
import{catchError,map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {
   
    errorMsg:string;
  constructor(private http:HttpClient) { }
title= new Subject<any>();
     getEployee():Observable<any>{
       return this.http.get('http://localhost:3000/users').
       pipe(map((data:any)=>data),
        
       
       )
      
     }
    
    
    getEmployeebyid(id:number){
      return this.http.get("http://localhost:3000/users/"+id).
      pipe(map((data:any)=>data),
      
      
      )
     }

     postEmployee(obj):Observable<any>{
       return this.http.post( "http://localhost:3000/users/",obj)
     }

     editEmployee(id,obj):Observable<any>{
       return this.http.put("http://localhost:3000/users/"+id,obj)
     }

     deleteEmployee(id):Observable<any>{
      return this.http.delete("http://localhost:3000/users/"+id)
     }
      
    }

