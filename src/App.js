import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import './scss/app.scss';
import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';
import { createContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/counterSlice';

export const SearchContext = createContext('');

function App() {
  const [searchText, setSearchText] = useState('');

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div>
        <div>
          <button aria-label="Increment value" onClick={() => dispatch(increment())}>
            Increment
          </button>
          <span>{count}</span>
          <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
      </div>

      <div className="wrapper">
        <SearchContext.Provider value={{ searchText, setSearchText }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
