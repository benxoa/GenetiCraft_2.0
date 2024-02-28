import React from 'react'
import 'flowbite';
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Header  from './components/Header.jsx';
import  Footer  from '../src/components/Footer.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import CreditStore from './pages/CreditStore.jsx';
import NotFound from './partials/NotFound.jsx';
import EmailSended from './partials/EmailSended.jsx';
import UserProfile from './users/UserProfile.jsx';
import ResetPassword from './auth/ResetPassword.jsx';
import PrivecyPolicy from './pages/PrivecyPolicy.jsx';
import  PdfTranslator  from '../src/tools/PdfTranslator.jsx';
import PdftoText from './tools/PdftoText.jsx';
import PdftoSpeech from './tools/PdftoSpeech.jsx';
import AiTools from './pages/AiTools.jsx';
import GenPrivecy from './pages/GenPrivecy.jsx';
import RemoPriecy from './pages/RemoPriecy.jsx';
import Pixely from './pages/PixelyPrivecy.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header />
    <Routes>
    <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/store' element={<CreditStore />} />
      <Route path='/email-sent' element={<EmailSended />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/privecy-policy' element={<PrivecyPolicy />} />
      <Route path='/translate-pdf' element={<PdfTranslator />} />
      <Route path='/pdf-to-text' element={<PdftoText />} />
      <Route path='/pdf-to-speech' element={<PdftoSpeech />} />
      <Route path='/ai-tools' element={<AiTools />} />
      <Route path='/geneticraft-app' element={<GenPrivecy />} />
      <Route path='/remoai-app' element={<RemoPriecy />} />
      <Route path='/pixely-app' element={<Pixely />} />








      {/* <Route path='/ai-tools' element={<Services />} /> */}




      <Route path='*' element={<NotFound />} />
    </Routes>
      <Footer />
  </BrowserRouter>
)
