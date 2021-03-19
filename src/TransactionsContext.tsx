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

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export const TransactionsContext = createContext<Transaction[]>([]);

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
  function createTransaction(transaction: TransactionInput) {

    api.post('/transactions', transaction)//method post route 
  }


  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
} 