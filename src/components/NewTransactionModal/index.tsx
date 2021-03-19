import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState('')
  const [type, setType,] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    //prevent the default access to another route after form submit
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('');
    setAmount(1);
    setCategory('');
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          //every time the value from this input is changed, 
          //it's saved this value in SetState
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          min="1"
          value={amount}
          //event.target.value always returns a string,
          //then it's need to convert to Number
          onChange={event => setAmount(Number(event.target.value))}

        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {//function(handleSetTypeDeposit) 
              setType('deposit')//has only one argument,  
            }}//then use arrow function           
            isActive={type === 'deposit'}
            activeColor="green"
            color="white"
          >
            <img src={incomeImg} alt="Sinal de entradas" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            //proprieties from RadioBox styled component
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Sinal de entradas" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  )
}