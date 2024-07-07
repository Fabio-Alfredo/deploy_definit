import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

const URL_API_GOOGLE = import.meta.env.VITE_KEY_GOOGLE_SERVICE;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId= {URL_API_GOOGLE}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
