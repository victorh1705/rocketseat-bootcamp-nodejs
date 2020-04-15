import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
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
    return this.transactions.reduce(
      (acc, t): Balance => {
        if (t.type === 'income') acc.income += t.value;
        if (t.type === 'outcome') acc.outcome += t.value;
        acc.total = acc.income - acc.outcome;

        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
