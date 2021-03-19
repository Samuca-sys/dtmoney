import React from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionContext } from '../../TransactionsContext';

import { Container } from "./styles";

export function Summary() {
  return (
    <Container>

      <TransactionContext.Consumer>
        {//React api: HanderProps
          //Consumer'son is a function, not a component
          (data) => {
            console.log(data)

            return <p>ok</p>
          }}
      </TransactionContext.Consumer>

      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-R$500,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  )
} 