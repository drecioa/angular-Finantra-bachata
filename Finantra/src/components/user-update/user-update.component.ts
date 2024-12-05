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


@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

    this.update.updateUser(new LoginDto(this.user.email, this.user.password), userAux).subscribe(
      (response)=>{
        console.log(response);
        this.util.auth.login(userAux, ""); //TODO: Solucionar esto (pocho)
        window.location.reload();
      },
      (error)=>{
        console.log(error);
      }
    )
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
    this.newsService.saveTopics(new LoginDto(this.user.email, this.user.password), this.listTopic).subscribe(
      (data)=>{
        console.log(data);
        this.util.redirect.navigate(["home/news"])
      }, (error)=>{console.error(error);}
    )
  }

  borrarCuenta(){
    this.deleteUserService.deleteUser(new LoginDto(this.user.email, this.user.password)).subscribe(
      (data)=>{
        console.log(data);
        this.util.auth.logout();
        this.util.redirect.navigate(["/auth"])
      }, (error)=>{console.error(error);
      }
    );
  }
  ngOnInit(): void {
      this.util.auth.data.subscribe(
        (data)=>{
          this.user= JSON.parse(data);
        }
      )

      this.newsService.getTopics().subscribe(
        (data)=>{
          this.topics=data.data;
        }, (error)=>{console.error(error);
        }
      )

      
      this.newsService.getUserTopics(new LoginDto(this.user.email, this.user.password)).subscribe(
        (data)=>{
          this.listOriginTopic=data.data;
          if(this.listOriginTopic.length!=0){
            this.listTopic= this.listOriginTopic.slice();
          }
        }
      )
  }


}
