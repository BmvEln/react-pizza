import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../../components/PizzaBlock/PizzaSkeleton';
import Sort from '../../components/Sort/Sort';
import Paginate from '../../components/Paginate/Paginate';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import { setCategoryNumber } from '../../redux/slices/filterSlice';

const Home = () => {
  const { searchText } = useContext(SearchContext);

  // Состояния для получения пицц
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Состояния для проброса в компоненты
  // const [categoryNumber, setCategoryNumber] = useState(0);
  const dispatch = useDispatch();
  const categoryNumber = useSelector((state) => state.filterReducer.categoryNumber);
  // const { sort } = useSelector((state) => state.filterReducer.sort);

  console.log('categoryNumber', categoryNumber);

  const [sortMethod, setSortMethod] = useState({ name: 'популярности', sortProperty: 'rating' });

  const [presentPage, setPresentPage] = useState(1);

  const onClickCategory = (id) => {
    console.log(id);
    dispatch(setCategoryNumber(id));
  };

  useEffect(() => {
    setLoading(true);
    // Переменные для fetch запроса
    const category = categoryNumber > 0 ? `category=${categoryNumber}` : '';
    const sortBy = sortMethod.sortProperty.replace('-', '');
    const order = sortMethod.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchText ? `&search=${searchText}` : '';

    fetch(
      `https://6502df88a0f2c1f3faeb039b.mockapi.io/items?page=${presentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((response) => response.json())
      .then((pizzas) => {
        setPizzas(pizzas);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
    window.scrollTo(0, 0);
  }, [categoryNumber, sortMethod, searchText, presentPage]);

  // console.log(categoryNumber, sortMethod);

  if (!pizzas) {
    return <h2 className="headingError">{`Error: ${error}`}</h2>;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryNumber} onClickCategory={onClickCategory} />
        <Sort value={sortMethod} onClickSort={(index) => setSortMethod(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Paginate onChangePage={(number) => setPresentPage(number)} />
    </div>
  );
};

export default Home;
