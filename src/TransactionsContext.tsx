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
//2- First way
// interface TransactionInput {
//   title: string,
//   type: string,
//   category: string
//   amount: number,
// }

//3 - Second way (omitting elements from Transaction interface)
//type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

//4 - Third way (picking specific elements from Transaction interface)
type TransactionInput = Pick<Transaction, 'title' | 'type' | 'category' | 'amount'>

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

  //0 -TransactionsContext create a transaction
  //(function createTransaction(transaction) {})

  //1 - createTransaction receives another interface 
  //(function createTransaction(transaction: TransactionInput) {})
  //or type using the following ways (omit or pick)
  function createTransaction(transaction: TransactionInput) {

    api.post('/transactions', transaction)//method post route 
  }


  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
} 