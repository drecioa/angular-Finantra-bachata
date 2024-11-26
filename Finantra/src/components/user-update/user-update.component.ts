import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Topic } from '@models/Topic';
import { User } from '@models/User';
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
  protected user:User={
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }

  protected topics:Topic[]=[];

  constructor(private update:UpdateService, private util:UtilsService, private newsService:NewsService){}

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

      this.newsService.getTopics().subscribe(
        (data)=>{
          this.topics=data.data;
        }, (error)=>{console.error(error);
        }
      )
  }


}
