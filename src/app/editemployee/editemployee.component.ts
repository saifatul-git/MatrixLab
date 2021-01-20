import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { EmpserviceService } from '../service/empservice.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  myForm:FormGroup;
  emprecord: any;
  empdet: any;
  img:any;
  sellersPermitFile: any;
  sellersPermitString: string;
  fileToUpload: any;
  imageUrl: any;
  imagePath:any;
  tilte:any;
  fileType:any;
  imageName:any;
  constructor(private ar:ActivatedRoute,private _sanitizer: DomSanitizer,private empservice:EmpserviceService,private routes:Router) { 
    routes.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(routes.routerState, routes.routerState.root).join('-');
        console.log(title);
        this.tilte=title;
      
      }
    });
    this.myForm=new FormGroup({
      first_name:new FormControl('',Validators.required),
      last_name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      // upload:new FormControl('')
    })
  }

  ngOnInit(): void {
    this.empservice.title.next(this.tilte)
    this.empdet=this.ar.snapshot.queryParamMap.get('id')
    this.empgetdetails();
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
  empgetdetails(){
       
     this.empservice.getEmployeebyid(this.empdet).subscribe((dt:any)=>{
       this.emprecord=dt; 
       var b=this.emprecord.imageName;
       var c=this.emprecord.fileType;
       this.imagePath=c+"."+b; 
       this.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
       +this.emprecord.upload);
       this.myForm.get('first_name').setValue(this.emprecord.first_name);
       this.myForm.get('last_name').setValue(this.emprecord.last_name);
       this.myForm.get('email').setValue(this.emprecord.email);
     })
    }

   
    picked(event, file: FileList) {
      this.fileToUpload = file.item(0);
      console.log(this.fileToUpload)
      let fileName=this.fileToUpload.name;
      console.log(fileName)
      let filearr=fileName.split('.');
      console.log(filearr);
      this.fileType=filearr[0];
      this.imageName=filearr[1];
      console.log(this.imageName);
      console.log(this.fileType)
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.imagePath='';
      }
      reader.readAsDataURL(this.fileToUpload);
      // this.currentId = field;
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        
          this.sellersPermitFile = file;
          this.handleInputChange(file); //turn into base64
        
       
      }
      else {
        alert("No file selected");
      }
     
    }
    handleInputChange(files) {
      var file = files;
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      //this.imageSrc = base64result;
      // let id = this.currentId;
          this.sellersPermitString = base64result;
         
  
      // this.log();
    }
   
    Cancel(){
      this.routes.navigate(['employeelist'],{ queryParams: { id:this.empdet }});
    }
  subData(){
      if(this.myForm.valid==true){
        var obj={
          first_name:this.myForm.controls.first_name.value,
          last_name:this.myForm.controls.last_name.value,
          email:this.myForm.controls.email.value,
          upload:this.sellersPermitString,
          fileType:this.fileType,
        imageName:this.imageName
        }
        this.empservice.editEmployee(this.empdet,obj).subscribe((dt:any)=>{
          
            this.routes.navigate(['employeelist'],{ queryParams: { id:this.empdet }});
          
        })

      } 
      

         
  }

  
}
