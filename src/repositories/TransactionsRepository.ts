import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((val, transaction) => {
      switch (transaction.type) {
        case 'income':
          return {
            ...val,
            income: transaction.value + val.income,
            total: transaction.value + val.income - val.outcome,
          };
        case 'outcome':
          return {
            ...val,
            outcome: transaction.value - val.outcome,
            total: val.income - transaction.value + val.outcome,
          };
        default:
          return val;
      }
    }, initialBalance);
    return balance;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
