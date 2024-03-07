import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { EditModalContextProvider } from './Context/EditModalContext.tsx'
import { SortAndSearchContextProvider } from './Context/SortAndSearchContext.tsx'
import { ToasterProvider } from './Providers/ToastProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToasterProvider />
      <EditModalContextProvider>
        <SortAndSearchContextProvider>
          <App />
        </SortAndSearchContextProvider>
      </EditModalContextProvider>
  </React.StrictMode>,
);
