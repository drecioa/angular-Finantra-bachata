import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { News } from '@models/News';
import { User } from '@models/User';
import { NewsService } from '@services/newsService/news-service.service';
import { UtilsService } from '@services/utilsService/utils.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  protected loading:boolean=true;
  protected news:News[]=[];
  private user:User;
  constructor(private newsService:NewsService, private util:UtilsService){}
  ngOnInit(): void {
    this.util.auth.data.subscribe(
      (data)=>{
        this.user= JSON.parse(data);
      }
    )

    this.newsService.getNews(new LoginDto(this.user.email, this.user.password)).subscribe(
      (data)=>{
        console.log(data+"Y la respuesta?")
        this.news=data.data;

        this.loading=false;
      }, (error)=>{
        console.error(error);
        this.loading=false;
      }
    )
  }
}
