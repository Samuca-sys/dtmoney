import React from 'react'
import logoImg from '../../assets/logo.svg'

import { Content, Container } from './styles'

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button
          onClick={onOpenNewTransactionModal}
          type="button">Nova transação
        </button>

      </Content>
    </Container>
  )
}