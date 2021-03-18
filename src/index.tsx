import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs'
import { App } from './App';

createServer({
  routes() {
    this.namespace = 'api'; //namespace by /api route and so on
    this.get('/transactions', () => {//get method by /transactions route list
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
    //post method by /transactions route list
    //schema = database, request = data
    this.post('/transactions', (shema, request) => {
      //data needs to be converted from string to JSON
      const data = JSON.parse(request.requestBody)

      return data;
    })
  }
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

