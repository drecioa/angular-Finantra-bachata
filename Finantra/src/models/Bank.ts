export interface Bank{
    accountId: string,
    providerId: string,
    bankName: string,
    iban: string,
    currency: string,
    balance: number,
    notes: string
}