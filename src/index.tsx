import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    //Fictional table 
    transaction: Model
  },

  //pre-registered data
  seeds(server) {
    server.db.loadData({

      //Model in plural form
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Imóvel',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api'; //namespace by /api route and so on

    this.get('/transactions', () => {//get method by /transactions route list

      //return all registers from transaction fictional table
      return this.schema.all('transaction')
    })

    //post method by /transactions route list
    //schema = database, request = data
    this.post('/transactions', (schema, request) => {

      //data needs to be converted from string to JSON
      const data = JSON.parse(request.requestBody)

      //return fictional table with data inside it
      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

