export interface Transaction {
    transactionId: string;
    timestamp: string;
    description: string;
    amount: number;
    currency: string;
    transactionType: string;
    transactionCategory: string;
    transactionClassification: string[];
    merchantName: string;
    runningBalance: {
      amount: number;
      currency: string;
    };
    meta: {
      bankTransactionId: string;
      providerCategory: string;
    };
  }
  