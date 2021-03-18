import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./style";

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string
  amount: string,
  createdAt: string
}

export function TransactionTable() {
  //state receives Transaction interface as transaction array
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //request a transactions list converted to JSON from axios api
  //then show through setState
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

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
              <td className={transaction.type}>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </Container>
  )
}