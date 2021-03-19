import { useContext } from "react";

import { TransactionsContext } from "../../TransactionsContext";
import { Container } from "./style";


export function TransactionTable() {

  const { transactions } = useContext(TransactionsContext)

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            //for each transaction return an tr element
            //map -> necessary a key(identifier)
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                { //convert amount to BRL currency format 
                  //using Intl(Browser Api)
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                { //convert create to date, then to BR date format 
                  new Intl.DateTimeFormat('pt-BR')
                    .format(new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </Container>
  )
}