import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import BookModal from '../BookModal';
import {useDispatch, useSelector} from 'react-redux';
import {bookActions, bookState} from '../../store/books';
import {PortalWithState} from 'react-portal';
import { editBookSelector, editBookState } from '../../store/editBook';
import { useState } from 'react';
import _ from 'lodash';
import { api } from '../../api';

// eslint-disable-next-line react/prop-types
const BookItem = ({title, count, author, id}) => {
  const dispatch = useDispatch();

  const bookSelector = useSelector(bookState);
  const editBooks = useSelector(editBookState);

  const {showModal, selectedBook} = bookSelector;

  const {books} = useSelector(bookState);

  const selectBook = (id) => {
    const selectedItem = books.find((item) => item.id === id);
    dispatch(bookActions.chooseBook(selectedItem));
    dispatch(bookActions.openModal());
  };

  const saveData = async (e) => {
    e.preventDefault();
    await api.put(`/books/${selectedBook.id}`, JSON.stringify(selectedBook), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };

  const handleInputChange = (e) => {
    const selectors = e.target.name.split(' ')
    const newObj = _.cloneDeep(selectedBook);
    if(selectors.length>1){
      console.log(selectors, e.target);
      const item = newObj[selectors[0]][e.target.dataset.index]
      item[selectors[1]]= e.target.value
    } else{
      newObj[e.target.name] = e.target.dataset.array ? e.target.value.split(',') : e.target.value;
    }
    dispatch(bookActions.chooseBook(newObj));
    console.log(e.target.name,e.target.value,"s");
  };

  return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, isOpen, portal}) => (
        <>
          <button className={styles.button} onClick={openPortal}>
            <div
              role="button"
              onClick={() => selectBook(id)}
              className={styles.wrapper}>
              <div className={styles.titleWrapper}>
                <p className={styles.title}>Title</p>
                <p className={styles.value}>{title}</p>
              </div>
              <div className={styles.authorWrapper}>
                <p className={styles.title}>Author</p>
                <p className={styles.value}>{author}</p>
              </div>
              <div className={styles.downloadsWrapper}>
                <p className={styles.title}>Downloads</p>
                <p className={styles.value}>{count}</p>
              </div>
            </div>
          </button>

          {portal(
            <div className={styles.modal}>
              <button className={styles.close} onClick={closePortal}>
                X
              </button>

              <div className={styles.modalWrapper}>
                <p className={styles.edit}>Edit Book</p>
                <form onSubmit={saveData} className={styles.form}>
                  <input
                    name='id'
                    value={selectedBook.id}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  {selectedBook?.authors?.map((author, index) => <input
                   key={index}
                    name="authors name"
                    data-index={index}
                    // eslint-disable-next-line react/prop-types
                    value={author.name}
                    onChange={handleInputChange}
                    className={styles.input}
                  /> 
                )}
                {selectedBook?.authors?.map((author, index) => <input
                   key={index}
                    name="authors birth_year"
                    data-index={index}
                    // eslint-disable-next-line react/prop-types
                    value={author.birth_year}
                    onChange={handleInputChange}
                    className={styles.input}
                  /> 
                )}
                {selectedBook?.authors?.map((author, index) => <input
                   key={index}
                    name="authors death_year"
                    data-index={index}
                    // eslint-disable-next-line react/prop-types
                    value={author.death_year}
                    onChange={handleInputChange}
                    className={styles.input}
                  /> 
                )}
                  <input
                  name='download_count'
                    value={selectedBook.download_count}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                    <input
                  name='bookshelves'
                  data-array={1}
                    value={selectedBook.bookshelves}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                    <input
                  name='mediaType'
                    value={selectedBook.id}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <button type='submit'>Submit</button>
                </form>
              </div>
            </div>,
          )}
        </>
      )}
    </PortalWithState>
  );
};

BookModal.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  author: PropTypes.any,
  id: PropTypes.string,
};

export default BookItem;
