import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/apollo-client.ts'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <ApolloProvider client={client}>
    <App />
    <ToastContainer />
    </ApolloProvider>
    </BrowserRouter>
)
