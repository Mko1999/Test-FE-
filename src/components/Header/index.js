import React from 'react';
import styles from './Header.module.scss';
import {useDispatch} from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();

  const addBook = () => {
    console.log('book added');
  };

  return (
    <div className={styles.header}>
      <button onClick={addBook} className={styles.button}>
        Add Book
      </button>
    </div>
  );
};

export default Header;
