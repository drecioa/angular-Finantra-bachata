import { Component } from '@angular/core';
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
export class UserUpdateComponent {
  protected user:User={
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }
  constructor(private update:UpdateService, private util:UtilsService){
    const userFromStorage=sessionStorage.getItem("user");
    if(userFromStorage){
      this.user=JSON.parse(userFromStorage);
    }
  }

  updateUserMethod(form:NgForm):void{
    const userAux:User=form.value;

    this.update.updateUser(userAux.email, userAux).subscribe(
      (response)=>{
        console.log(response);
        this.util.auth.login(userAux);
        this.user=userAux;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
