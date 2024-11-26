import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CryptoService } from '@services/crypto/crypto.service';

@Component({
  selector: 'app-crypto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crypto-form.component.html',
  styleUrl: './crypto-form.component.css'
})
export class CryptoFormComponent implements OnInit {

  public search:string | null = null;

  constructor (cryptoService: CryptoService) { }

  ngOnInit(): void {
    
  }
  
}
