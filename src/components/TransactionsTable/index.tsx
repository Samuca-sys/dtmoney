import { useEffect } from "react";
import { Container } from "./style";

export function TransactionTable() {
  //Chama rota ficticia, recebe a resposta, 
  //converte paraa JSON e apresenta via console.log
  useEffect(() => {
    fetch('http://localhost:3000/api/transaction')
      .then(response => response.json())
      .then(data => console.log(data))
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
          <tr>
            <td>Desenvolvimento</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>10/02/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">-R$1.000</td>
            <td>Desenvolvimento</td>
            <td>10/03/2021</td>
          </tr>

        </tbody>
      </table>
    </Container>
  )
}