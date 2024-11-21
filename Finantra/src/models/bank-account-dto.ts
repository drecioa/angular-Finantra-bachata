export class BankAccountDTO {
    accountId : string;
    providerId : string;
    bankName : string;
    iban : string;
    notes : string;
    currency: string;
    balance: number;

    constructor(accountId : string, providerId : string, bankName : string, iban : string, currency : string, balance : number, notes : string) {
        this.accountId = accountId;
        this.bankName = bankName;
        this.iban = iban;
        this.notes = notes;
        this.currency = currency;
        this.balance = balance;
        this.providerId = providerId;
    }
}
