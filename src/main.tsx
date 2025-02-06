import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "441568755564-5v6dhbdal6c5rbng2mq9n71g56dpdb7f.apps.googleusercontent.com"
// const clientIdLinked = "77lxsqtgmxi16p"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>

    <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
