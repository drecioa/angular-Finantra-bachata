export class CryptoDto {
    id: string;
    name: string; 
    apiSymbol: string;
    symbol: string;
    thumb: string;

    constructor (id: string, name: string, apiSymbol: string, symbol: string, thumb:  string) {
        this.id = id;
        this.name = name;
        this.apiSymbol = apiSymbol;
        this.symbol = symbol;
        this.thumb = thumb;
    }
}
