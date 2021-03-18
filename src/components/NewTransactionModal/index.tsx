import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import React, { FormEvent, useState } from 'react';
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(1);
  const [category, setCategory] = useState('')
  const [type, setType,] = useState('deposit');


  function handleCreateNewTransaction(event: FormEvent) {
    //prevent the default access to another route after form submit
    event.preventDefault();

    const data = {//data sent by method post route
      title,
      value,
      category,
      type,
    }

    api.post('/transactions', data)//method post route 
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
          value={value}
          //event.target.value always returns a string,
          //then it's need to convert to Number
          onChange={event => setValue(Number(event.target.value))}

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