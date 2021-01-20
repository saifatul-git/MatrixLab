 
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import{EmpserviceService} from '../service/empservice.service';
import{Router,NavigationEnd} from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  getdata:any=[];
  p: number = 1;
  img:any;
  tilte:any;
  errorMessage:string='Loading...';
   
  constructor(private routes:Router,private _sanitizer: DomSanitizer,private empservice:EmpserviceService,private ar:ActivatedRoute) {
    for(let i=0;i<this.getdata.length;i++){
    }
    routes.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(routes.routerState, routes.routerState.root).join('-');
        console.log(title);
        this.tilte=title;
      
      }
    });
    this.getemployeeservice()
     
   }

   

  ngOnInit(): void {
    this.empservice.title.next(this.tilte)
  }
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
  details(id){
     
    this.routes.navigate(['employeelist'],{ queryParams: { id:id }});
    }
  

  public getemployeeservice(){
     this.empservice.getEployee().subscribe((data:any)=>{
       
      this.getdata=data;
     })
  }
  
}
