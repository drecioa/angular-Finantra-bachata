import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  code: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura el parámetro `code` de la URL
    this.route.queryParams.subscribe(params => {
      this.code = params['code'] || null;
      if (this.code) {
        console.log('Código recibido:', this.code);
        // Aquí puedes hacer una llamada HTTP o cualquier otra acción con el código recibido
      } else {
        console.log('No se recibió código');
      }
    });
  }
}
