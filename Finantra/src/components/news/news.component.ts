import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { News } from '@models/News';
import { User } from '@models/User';
import { NewsService } from '@services/newsService/news-service.service';
import { UtilsService } from '@services/utilsService/utils.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  protected loading:boolean=false;
  protected page:number = 0;
  protected size:number = 10;
  protected lastPageReached:boolean = false;
  protected news:News[]=[];
  private user:User;

  
  constructor(private newsService:NewsService, private util:UtilsService){}
  ngOnInit(): void {
    this.util.auth.data.subscribe(
      (data)=>{
        this.user= JSON.parse(data);
      }
    )

    this.loadMoreNews();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  loadMoreNews(): void {
    if (this.loading || this.lastPageReached) return;

    this.loading = true;
    this.newsService.getNews(this.page, this.size, new LoginDto(this.user.email, this.user.password)).subscribe({
      next: (response) => {
        console.log("Respuesta: " , response)
        if (response.data.content.length === 0) {
          this.lastPageReached = true;
        } else {
          this.news = [...this.news, ...response.data.content];
          this.page++;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onScroll(): void {
    const scrollTop = window.scrollY;
    const offsetHeight = document.body.offsetHeight;
    const innerHeight = window.innerHeight;

    if (scrollTop + innerHeight >= offsetHeight - 100) {
      this.loadMoreNews();
    }
  }
}
