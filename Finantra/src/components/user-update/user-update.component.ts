import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '@models/User';
import { UpdateService } from '@services/updateService/update-service.service';
import { UtilsService } from '@services/utilsService/utils.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{
  protected user:User={
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }
  constructor(private update:UpdateService, private util:UtilsService){}

  updateUserMethod(form:NgForm):void{
    const userAux:User=form.value;

    this.update.updateUser(this.user.email, userAux).subscribe(
      (response)=>{
        console.log(response);
        this.util.auth.login(userAux);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  ngOnInit(): void {
      this.util.auth.data.subscribe(
        (data)=>{
          this.user= JSON.parse(data);
        }
      )
  }
}
