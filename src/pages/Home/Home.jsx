import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../../components/Categories/Categories';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../../components/PizzaBlock/PizzaSkeleton';
import Sort from '../../components/Sort/Sort';
import Paginate from '../../components/Paginate/Paginate';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import { setCategoryNumber, setPresentPage, setFilters } from '../../redux/slices/filterSlice';
import { typesSorts } from '../../components/Sort/Sort';
import axios from 'axios';
import { useRef } from 'react';

const Home = () => {
  const { searchText } = useContext(SearchContext);
  const navigate = useNavigate();

  // Состояния для получения пицц
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const paramsInSearch = useRef(false);
  const embed = useRef(false);

  const dispatch = useDispatch();
  const { categoryNumber, sort, presentPage } = useSelector((state) => state.filterReducer);

  const onClickCategory = (id) => {
    dispatch(setCategoryNumber(id));
  };

  const alterPresentPage = (number) => {
    dispatch(setPresentPage(number));
  };

  // Если ранее был рендер и какая-то зависимось поменялась, то добавь их в адресную строчку
  // Заметка! useEffect выполняется хотя бы один раз - лайфхак с переключением embed.current на true;
  useEffect(() => {
    if (embed.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryNumber,
        presentPage,
      });

      console.log(queryString);

      navigate(`?${queryString}`);
    }

    // При старте приложения не вставляем в URL-адрес поисковые данные.
    // Только после первого рендеринга
    embed.current = true;
  }, [categoryNumber, sort.sortProperty, presentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе.
  // Параметры превращаем в объект
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      // Найдем объект, т.к. в поиске передается строка
      const sort = typesSorts.find((obj) => obj.sortProperty === params.sortProperty);

      console.log(params);

      // Все данные передаем в редакс
      dispatch(setFilters({ ...params, sort }));

      // Если пришли параметры из URL, то тогда при первом рендеринге ничего не делай, жди
      // Нужно проверить что параметры действительно придут из URL (чтобы не было 2 поиска)
      // Если параметры придут из URL, то лишь в этом случае будет производиться получение информации о пиццах
      paramsInSearch.current = true;
    }
  }, []);

  // Если был первый рендер или же из URL взяли параметры, то идет запрос на пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!paramsInSearch.current) {
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
    }

    paramsInSearch.current = false;
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
