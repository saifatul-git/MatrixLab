import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { HeaderComponent } from './header/header.component';
 
 

const routes: Routes = [
  {path:'',redirectTo:'employee',pathMatch:'full'},  
  {path:'employee',component:EmployeeComponent,data:{title:'Employee Page'}},
  {path:'addemployee',component:AddemployeeComponent,data:{title:'Add Employee Page'}},
  {path:'editemployee',component:EditemployeeComponent,data:{title:'Edit Employee Page'}},
  {path:'employeelist',component:EmployeelistComponent,data:{title:'Employee Details'}},
   {path:'**',redirectTo:'employee'}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
