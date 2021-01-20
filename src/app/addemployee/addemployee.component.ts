import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { EmpserviceService } from '../service/empservice.service';
import{MsgserviceService} from '../messageservice/msgservice.service'

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  fnamePattern = "^[a-zA-Z ]*$";
  lnamePattern = "^[a-zA-Z]*$";
  alert:boolean=false;
  
  myForm:FormGroup;
  empdet: any;
  currentId: number = 0;
  sellersPermitFile: any;
  sellersPermitString: string;
  fileToUpload: any;
  imageUrl: any;
  fileType:any;
  imageName:any;
  tilte:any;
  constructor(private ar:ActivatedRoute,private empservice:EmpserviceService,private routes:Router,private me:MsgserviceService,) { 
    routes.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(routes.routerState, routes.routerState.root).join('-');
        console.log(title);
        this.tilte=title;
      
      }
    });
    this.myForm=new FormGroup({
      first_name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern(this.fnamePattern)]),
      last_name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern(this.lnamePattern)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      // upload:new FormControl('',Validators.required)
    })
    //this.subData()
  }

  ngOnInit(): void {
   
    this.empservice.title.next(this.tilte)
  }

  msg=this.me.msgser;

  
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
  subData(){
    this.alert=true;
    if(this.myForm.valid==true){
      var obj={
        first_name:this.myForm.controls.first_name.value,
        last_name:this.myForm.controls.last_name.value,
        email:this.myForm.controls.email.value,
        upload:this.sellersPermitString,
        fileType:this.fileType,
        imageName:this.imageName
      }
       
      console.log(obj)
      this.empservice.postEmployee(obj).subscribe((dt:any)=>{
         this.myForm.reset()

        console.log(dt);
        if(dt.id>0){
          setTimeout(() => {
           this.routes.navigate(['employeelist'],{ queryParams: { id:dt.id }});
          },5000);
        
        }
        
        
      })
    } 

    setTimeout(()=>{
      this.alert=false;
    },2000)
  }
   
 

  
Cancel(){
  this.routes.navigate(['employee']);
}
  
  picked(event, field,file: FileList) {
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
    }
    reader.readAsDataURL(this.fileToUpload);
    this.currentId = field;
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
    let id = this.currentId;
        this.sellersPermitString = base64result;
       

    // this.log();
  }
 
}
