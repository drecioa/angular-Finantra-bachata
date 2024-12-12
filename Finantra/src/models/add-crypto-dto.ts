export class AddCryptoDTO {
    coinId:string
    amount:Number

    constructor(coinId:string, amount:Number){
        this.coinId=coinId;
        this.amount=amount;
    }
}
