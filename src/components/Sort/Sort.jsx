import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sort.module.scss';
import { setSortMethod } from '../../redux/slices/filterSlice';
import { useRef } from 'react';
import { useEffect } from 'react';

export const typesSorts = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },

  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },

  { name: 'алфавиту (DESC)', sortProperty: 'alphabet' },
  { name: 'алфавиту (ASC)', sortProperty: '-alphabet' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterReducer.sort);
  const sortPopupRef = useRef();

  console.log(sortPopupRef);

  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const onClickSortHandler = () => {
    setIsActiveMenu(!isActiveMenu);
  };

  const onClickSortItem = (obj) => {
    dispatch(setSortMethod(obj));
    setIsActiveMenu(false);
  };

  useEffect(() => {
    // Так нельзя делать, но в случае если нужно обраиться к родительскому элементу body, то можно. Это исключение
    // Sort mount
    const onClickHandler = (e) => {
      if (!(e.target.offsetParent === sortPopupRef.current)) {
        setIsActiveMenu(false);
        // click outside
      }
    };
    document.body.addEventListener('click', onClickHandler);

    // Sort unmount
    return () => document.body.removeEventListener('click', onClickHandler);
  }, []);
  return (
    <div ref={sortPopupRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onClickSortHandler}>{sort.name}</span>
      </div>
      {isActiveMenu && (
        <div className={styles.sort__popup}>
          <ul>
            {typesSorts.map((typeSort, index) => (
              <li
                key={index}
                onClick={() => onClickSortItem(typeSort)}
                className={sort.sortProperty === typeSort.sortProperty ? styles.active : ''}>
                {typeSort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
