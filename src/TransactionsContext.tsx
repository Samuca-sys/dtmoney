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

//2 - Create a interface to specif the transaction context data
interface TransactionContextData {
  //it receives Transaction array and function createTransaction
  //with transaction: TransactionInput params and void return
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => void,

}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

//3 - TransactionsContext receives TransactionContextData interface
//(export const TransactionsContext = createContext<TransactionContextData>([]))

//4 - Force object as TransactionContextData
//(createContext<TransactionContextData>({ } as TransactionContextData))
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
  function createTransaction(transaction: TransactionInput) {

    api.post('/transactions', transaction)//method post route 
  }


  return (
    //01 - value should receive function createTrasaction
    //(<TransactionsContext.Provider value={{transactions, createTransaction}}>)

    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
} 