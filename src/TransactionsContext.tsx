import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string
  amount: number,
  createdAt: string
}

interface TransactionProviderProps {
  children: ReactNode
}

interface TransactionContextData {
  transactions: Transaction[],
  //3 - Specific return as Promise<void>  
  createTransaction: (transaction: TransactionInput) => Promise<void>,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>


export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  //state receives Transaction interface as transaction array
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //request a transactions list converted to JSON from axios api
  //then show through setState
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  // createTransaction receives TransactionInput type
  //2 - transform in async function that await arguments
  async function createTransaction(transaction: TransactionInput) {

    await api.post('/transactions', transaction)//method post route 
  }


  return (

    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
} 