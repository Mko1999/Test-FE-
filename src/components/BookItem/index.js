import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import BookModal from '../BookModal';
import {useDispatch, useSelector} from 'react-redux';
import {bookActions, bookState} from '../../store/books';
import {PortalWithState} from 'react-portal';

// eslint-disable-next-line react/prop-types
const BookItem = ({title, count, author, id}) => {
  const dispatch = useDispatch();

  const bookSelector = useSelector(bookState);

  const {showModal, selectedBook} = bookSelector;

  const {books} = useSelector(bookState);

  const selectBook = (id) => {
    const selectedItem = books.find((item) => item.id === id);
    dispatch(bookActions.chooseBook(selectedItem));
    dispatch(bookActions.openModal());
  };

  const saveData = () => {
    console.log('submit');
  };

  const handleInputChange = () => {};

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
                  {/*<input*/}
                  {/*  value={selectedBook.id}*/}
                  {/*  onChange={handleInputChange}*/}
                  {/*  className={styles.input}*/}
                  {/*/>*/}
                  {/*<input*/}
                  {/*    /!* eslint-disable-next-line react/prop-types *!/*/}
                  {/*  value={selectedBook.authors.map((author) => author.name)}*/}
                  {/*  onChange={handleInputChange}*/}
                  {/*  className={styles.input}*/}
                  {/*/>*/}
                  {/*<input*/}
                  {/*  value={selectedBook.id}*/}
                  {/*  onChange={handleInputChange}*/}
                  {/*  className={styles.input}*/}
                  {/*/>*/}
                  {/*<input*/}
                  {/*  value={selectedBook.id}*/}
                  {/*  onChange={handleInputChange}*/}
                  {/*  className={styles.input}*/}
                  {/*/>*/}
                  {/*<input*/}
                  {/*  value={selectedBook.id}*/}
                  {/*  onChange={handleInputChange}*/}
                  {/*  className={styles.input}*/}
                  {/*/>*/}
                  {/*<input*/}
                  {/*  value={selectedBook.id}*/}
                  {/*  onChange={handleInputChange}*/}
                  {/*  className={styles.input}*/}
                  {/*/>*/}
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
