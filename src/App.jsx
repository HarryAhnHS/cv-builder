// import { useState } from 'react'
import './styles/App.css'

import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className="body">
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  )
}

export default App
