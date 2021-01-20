import { Component, OnInit } from '@angular/core';
import { EmpserviceService } from '../service/empservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
title:any;
  constructor(private empservice:EmpserviceService) {
   
   }

  ngOnInit(): void {
    this.empservice.title.subscribe(res=>{
      this.title=res;
      console.log(res);
    })
  }

}
