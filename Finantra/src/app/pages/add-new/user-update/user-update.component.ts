import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginDto } from '@models/loginDto';
import { Topic } from '@models/Topic';
import { User } from '@models/User';
import { DeleteUserService } from '@services/deleteService/delete-user.service';
import { NewsService } from '@services/newsService/news-service.service';
import { UpdateService } from '@services/updateService/update-service.service';
import { UtilsService } from '@services/utilsService/utils.service';
import { HeaderComponent } from "../../../../components/header/header.component";


@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})

export class UserUpdateComponent implements OnInit{
  protected listTopic:Topic[]=[];
  private listOriginTopic:Topic[]=[];
  protected user:User={
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }

  protected topics:Topic[]=[];

  constructor(private update:UpdateService, private util:UtilsService, private newsService:NewsService, private deleteUserService:DeleteUserService){}

  updateUserMethod(form:NgForm):void{
    const userAux:User=form.value;
    this.update.updateUser(userAux).subscribe({
      next: (response)=>{
        console.log("El usuairo se ha actualizado",response);
        this.util.auth.login(userAux, response.headers.get('Authorization'));
        window.location.reload();
      },
      error:(error)=>{
        console.log("Error al actualizar el usuario",error);
      }
    });
  }

  addTopicToList(value: string):void{
    if(this.listTopic.filter(x=>x.name===value).length==0 
      && this.topics.filter(x=>x.name===value).length!=0){

      this.listTopic.push(new Topic(value));
      const inputElement = document.getElementById("newTopic") as HTMLInputElement;
      inputElement.value = "";

    }
  }

  deleteTopicOfList(value:string){
    this.listTopic= this.listTopic.filter(element=>element.name!=value)
  }

  saveTopics(){
    console.log(this.listTopic);
    this.newsService.saveTopics(this.listTopic).subscribe(
      (data)=>{
        console.log(data);
        this.util.redirect.navigate(["home/news"])
      }, (error)=>{console.error(error);}
    )
  }

  borrarCuenta(){
    this.deleteUserService.deleteUser().subscribe({
      next:(data)=>{
        console.log("Cuenta borrada correctamente ",data);
        this.util.auth.logout();
        this.util.redirect.navigate(["/auth"])
      }, 
      error:(error)=>{
        console.error("Error al intentar borrar la cuenta",error);
      }
    });
  }
  ngOnInit(): void {
      this.util.auth.data.subscribe(
        (data)=>{
          this.user= JSON.parse(data);
        }
      )

      this.newsService.getTopics().subscribe({
          next:(data)=>{
            this.topics=data.data;
            console.log("Los Topics son: ",data);
          }, 
          error:(error)=>{
            console.error("Error al intentar obtener los topics",error);
          }
        }
      )

      
      this.newsService.getUserTopics().subscribe(
        (data)=>{
          this.listOriginTopic=data.data;
          if(this.listOriginTopic.length!=0){
            this.listTopic= this.listOriginTopic.slice();
          }
        }
      )
  }


}
