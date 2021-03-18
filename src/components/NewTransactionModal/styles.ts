import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem; 
    border-radius: 0.25rem;
    border: 1px solid var(--input-color);
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem; 
  
    &::placeholder {
      color: var(--text-body);
    }

    & + input {//every input that has an input before it
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;
    
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`
interface RadioBoxProps {
  isActive: boolean;
  activeColor: 'green' | 'red';
}

const colors = {
  green: '#33CC95',
  red: '#E52E4D'
}

//to set isActive and activeColor proprieties in NewTransactionModal.tsx
export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid var(--input-color);
  border-radius: 0.25rem;

  background: ${(props) => props.isActive
    ? transparentize(0.9, colors[props.activeColor])
    : 'transparent'};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: 
      ${darken(0.1, '#D7D7D7')};//polished function
  }

  img {
    height: 20px;
    width: 20px;
  }

  span {
    display: inline-block;//to unlock margin attribute
    margin-left: 1rem;
    color: var(--text-title);
    font-size: 1rem;
  }
`