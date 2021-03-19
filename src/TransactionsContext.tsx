import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

//3 - get Transaction interface from TransactionsTable
interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string
  amount: number,
  createdAt: string
}

//6 - create TransactionProviderProps interface 
interface TransactionProviderProps {
  children: ReactNode

}

//1 - create TransactionaContext using Transaction interface
export const TransactionsContext = createContext<Transaction[]>([]);

//2 - create TransactionProvider (export function TransactionsProvider() {})

//7 - attribute TransactionProviderProps to TransactionsProvider
//(export function TransactionsProvider(props: TransactionProviderProps) {})

//8 - disrupt children from TransactionProviderProps
//export function TransactionsProvider({ children }: TransactionProviderProps) {}
export function TransactionsProvider({ children }: TransactionProviderProps) {
  //state receives Transaction interface as transaction array
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //request a transactions list converted to JSON from axios api
  //then show through setState
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  //4 - return TransactionContext.Provider with value
  //<TransactionsContext.Provider value={transactions}>

  //9 - attribute childre to TransactionsContext.Provider
  //<TransactionsContext.Provider value={transactions}>
  //{children}
  //</TransactionsContext.Provider>
  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
} 