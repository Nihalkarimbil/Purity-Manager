import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from './lib/strore/store.js'
import { Toaster } from "react-hot-toast"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
