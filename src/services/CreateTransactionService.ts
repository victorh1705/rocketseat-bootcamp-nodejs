import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type invalido');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total < value) throw Error('Nao ha saldo para esse saque');
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
