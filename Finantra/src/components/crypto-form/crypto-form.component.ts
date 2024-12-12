import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CryptoService } from '@services/cryptoService/crypto.service';
import { CommonModule } from '@angular/common';
import { CryptoDto } from '@models/crypto-dto';
import { UtilsService } from '@services/utilsService/utils.service';
import { of } from 'rxjs';
import { CryptoAmount } from '@models/crypto-amount';

@Component({
  selector: 'app-crypto-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crypto-form.component.html',
  styleUrl: './crypto-form.component.css'
})
export class CryptoFormComponent implements OnInit {
  protected cantidad:number=0;
  public searchControl = new FormControl('');
  public searchResults: CryptoDto[] = [];
  public selectedCrypto: CryptoDto | null = null;
  public showDropdown = false;
  public highlightedCrypto: CryptoDto | null = null;
  data: CryptoAmount  = {
    coinId:"",
    amount:0
  };

  constructor (private cryptoService: CryptoService, private utils: UtilsService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query.trim()) {
          return of([]); 
        }
        return this.cryptoService.searchCryptos(query);
      })
    ).subscribe({
      next: (results) => (this.searchResults = results),
      error: (err) => console.error("No se encontraron cryptos con ese nombre: ", err),
    });
  }

  selectCrypto(crypto: CryptoDto): void {
    this.selectedCrypto = crypto;
    this.searchControl.setValue(crypto.name); 
    this.showDropdown = false; 
  }

  hideDropdownWithDelay(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  addCrypto (amount:string) {
    this.data.coinId = this.selectedCrypto.id;
    this.data.amount = Number(amount);
    this.cryptoService.saveCrypto(this.data).subscribe({
     next: (response) => {
        console.log('Crypto procesada correctamente:', response);
        this.utils.redirect.navigate(["/home"]);
      },
      error:(error) => {
        console.error('Error al procesar la crypto:', error);
      }
    }
    );
  }

  subtractAmount(): void {
    if(this.cantidad>0)
    this.cantidad--;
  }
  addAmount(): void {
    this.cantidad++;
  }

}
