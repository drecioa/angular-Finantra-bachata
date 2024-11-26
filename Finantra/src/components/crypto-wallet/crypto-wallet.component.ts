import { Component, OnInit } from '@angular/core';
import { CryptoService } from '@services/cryptoService/crypto.service';
import { CommonModule } from '@angular/common';
import { Crypto } from '@models/crypto';

@Component({
  selector: 'app-crypto-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-wallet.component.html',
  styleUrl: './crypto-wallet.component.css'
})
export class CryptoWalletComponent implements OnInit {
  public cryptos: Crypto[] = [];

  constructor(private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.cryptoService.getAllCryptos().subscribe(
      (response) => {
        this.cryptos = response;
        if (this.cryptos.length > 0) {
          console.log("Se ha conectado con las cryptos");
        } else {
          console.log("No hay cryptos asociadas a esta cuenta");
        }
      }, (error) => {
        console.error("No se pudo conectar con las cryptos del usuario: ", error);
      }
    )
  }
}
