import { Component, OnInit } from '@angular/core';
import { CryptoService } from '@services/cryptoService/crypto.service';
import { CommonModule } from '@angular/common';
import { Crypto } from '@models/crypto';
import { UtilsService } from '@services/utilsService/utils.service';
import { CryptoAmount } from '@models/crypto-amount';

@Component({
  selector: 'app-crypto-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-wallet.component.html',
  styleUrl: './crypto-wallet.component.css'
})
export class CryptoWalletComponent implements OnInit {
  protected loading:boolean=true;
  public cryptos: Crypto[] = [];
  public selectedCrypto: Crypto | null = null;  
  public showAmountInput: boolean = false;
  data: CryptoAmount  = {
    coinId:"",
    amount:0
  };

  constructor(private cryptoService: CryptoService, utils: UtilsService) { }

  ngOnInit(): void {
    this.loadCryptos(); 
  }

  loadCryptos(): void {
    this.cryptoService.getAllCryptos().subscribe(
      (response) => {
        this.cryptos = response;
        if (this.cryptos.length > 0) {
          console.log("Se ha conectado con las cryptos");
        } else {
          console.log("No hay cryptos asociadas a esta cuenta");
        }
        this.loading=false;
      }, (error) => {
        console.error("No se pudo conectar con las cryptos del usuario: ", error);
      }
    );
  }

  selectCryptoForEdit(crypto: Crypto): void {
    this.selectedCrypto = crypto;
    this.showAmountInput = true;  
  }

  deleteCrypto(coinId: string): void {
    this.cryptoService.deleteCrypto(coinId).subscribe(
      (response) => {
        console.log('Criptomoneda eliminada:', response);
        this.loadCryptos();  
      },
      (error) => {
        console.error('Error al eliminar la criptomoneda:', error);
      }
    );
  }

  addCrypto (coinId:string, amount:string) {
    this.data.coinId = coinId;
    this.data.amount = Number(amount);
    
    this.cryptoService.saveCrypto(this.data).subscribe(
      (response) => {
        console.log('Crypto procesada correctamente:', response);
        this.loadCryptos(); 
        this.showAmountInput = false;  
        this.selectedCrypto = null; 
      },
      (error) => {
        console.error('Error al procesar la crypto:', error);
      }
    );
  }
}
