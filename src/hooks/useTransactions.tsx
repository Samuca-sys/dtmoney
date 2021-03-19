import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

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

  createTransaction: (transaction: TransactionInput) => Promise<void>,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>


const TransactionsContext = createContext<TransactionContextData>(
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
  async function createTransaction(transactionInput: TransactionInput) {

    //transform in constant
    //response receives every transaction data
    //and the createdAt attribute
    const response = await api.post(
      '/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    }//method post route 
    )

    //get response.data
    const { transaction } = response.data;

    //set Transactions with every transaction added already 
    //and push a new one 
    setTransactions([
      ...transactions,
      transaction
    ])

  }


  return (

    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context;
}