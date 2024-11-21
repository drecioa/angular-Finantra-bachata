import { BankAccountDTO } from './bank-account-dto';

describe('BankAccount', () => {
  it('should create an instance', () => {
    expect(new BankAccountDTO()).toBeTruthy();
  });
});
