import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../../components/PizzaBlock/PizzaSkeleton';
import Sort from '../../components/Sort/Sort';
import Paginate from '../../components/Paginate/Paginate';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import { setCategoryNumber, setPresentPage } from '../../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const { searchText } = useContext(SearchContext);

  // Состояния для получения пицц
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { categoryNumber, sort, presentPage } = useSelector((state) => state.filterReducer);

  const onClickCategory = (id) => {
    dispatch(setCategoryNumber(id));
  };

  const alterPresentPage = (number) => {
    dispatch(setPresentPage(number));
  };

  useEffect(() => {
    setLoading(true);
    // Переменные для fetch запроса
    const category = categoryNumber > 0 ? `category=${categoryNumber}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchText ? `&search=${searchText}` : '';

    axios
      .get(
        `https://6502df88a0f2c1f3faeb039b.mockapi.io/items?page=${presentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
    window.scrollTo(0, 0);
  }, [categoryNumber, sort.sortProperty, searchText, presentPage]);

  if (!pizzas) {
    return <h2 className="headingError">{`Error: ${error}`}</h2>;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryNumber} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Paginate value={presentPage} onChangePage={alterPresentPage} />
    </div>
  );
};

export default Home;
