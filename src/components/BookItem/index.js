import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {bookActions, bookState} from '../../store/books';
import {PortalWithState} from 'react-portal';
import {EditBookModal} from '../index';

const BookItem = ({title, count, author, id}) => {
  const dispatch = useDispatch();

  const {books} = useSelector(bookState);

  const selectBook = (id) => {
    const selectedItem = books.find((item) => item.id === id);
    dispatch(bookActions.chooseBook(selectedItem));
  };

  const shortenedTitle = title.length > 20 ? title.slice(0, 20) : title;

  return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, portal}) => (
        <>
          <button className={styles.button} onClick={openPortal}>
            <div
              role="button"
              onClick={() => selectBook(id)}
              className={styles.wrapper}>
              <div className={styles.titleWrapper}>
                <p className={styles.title}>Title</p>
                <p className={styles.value}>{shortenedTitle}</p>
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
              <div className={styles.modalHeader}>
                <p className={styles.edit}>Edit Book</p>
                <button className={styles.close} onClick={closePortal}>
                  X
                </button>
              </div>
              <EditBookModal id={id} />,
            </div>,
          )}
        </>
      )}
    </PortalWithState>
  );
};

BookItem.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  author: PropTypes.any,
  id: PropTypes.string,
};

export default BookItem;
