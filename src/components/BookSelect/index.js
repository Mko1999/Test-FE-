import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {getBookCategories} from '../../store/books/thunks';
import Select from 'react-select';
import {bookActions, bookState} from '../../store/books';

const BookSelect = () => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(getBookCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedItem !== null) {
      dispatch(bookActions.chooseSubject(selectedItem.value));
      dispatch(bookActions.getBooks(selectedItem.value));
    } else {
      dispatch(bookActions.chooseSubject(''));
      dispatch(bookActions.getBooks(null));
    }
  }, [selectedItem]);

  const bookSelector = useSelector(bookState);

  const {subjects} = bookSelector;

  const options = subjects.map((item) => ({
    value: item,
    label: item,
  }));

  const handleChange = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Select Category</p>
      <div className={styles.select}>
        <Select
          isClearable
          value={selectedItem}
          options={options}
          onChange={(item) => handleChange(item)}
        />
      </div>
    </div>
  );
};

export default BookSelect;
