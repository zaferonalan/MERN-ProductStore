import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
