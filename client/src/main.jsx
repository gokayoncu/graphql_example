import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client';
import client from './apollo.js';
import { BrowserRouter } from 'react-router';
import Navbar from './components/navBar/index.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Navbar />
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </>,
)
