import React, { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal';

import { TransactionsProvider } from './TransactionsContext';

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (

    //5 - App receives TransactionsProvider from TransactionsContext
    //before: <TransactionsContext.Provider value={transactions}>
    //after: <TransactionsProvider>

    //9.5 - App is working now because <TransactionsProvider> can have a son
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}


