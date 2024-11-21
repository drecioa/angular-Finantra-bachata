export class BankAccountDTO {
    private accountId : string;
    bankName : string;
    iban : string;
    notes : string;
    currency: string;
    balance: DoubleRange;

    constructor(accountId : string, bankName : string, iban : string, currency : string, balance : DoubleRange, notes : string) {
        this.accountId = accountId;
        this.bankName = bankName;
        this.iban = iban;
        this.notes = notes;
        this.currency = currency;
        this.balance = balance;
    }
}
