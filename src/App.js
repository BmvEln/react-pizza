import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import './scss/app.scss';
import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <Header searchText={searchText} setSearchText={setSearchText} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
