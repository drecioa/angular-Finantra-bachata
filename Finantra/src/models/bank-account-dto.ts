export class BankAccountDTO {
    private accountId : string;
    bankName : string;
    iban : string;
    notes : string;

    constructor(accountId : string, bankName : string, iban : string, notes : string) {
        this.accountId = accountId;
        this.bankName = bankName;
        this.iban = iban;
        this.notes = notes;
    }
}
