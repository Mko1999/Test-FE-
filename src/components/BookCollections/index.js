import styles from './styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {bookState} from '../../store/books';
import {BookItem} from '../index';
import {useState} from 'react';

const BookCollections = () => {
  const bookSelector = useSelector(bookState);

  const {books} = bookSelector;

  const [showModal, setShowModal] = useState(false);

  const renderBookItem =
    books.length > 0 &&
    books.map((item) => {
      return (
        <BookItem
          key={item.id}
          id={item.id}
          count={item.download_count}
          title={item.title}
          author={item.authors.map((author) => author.name)}
        />
      );
    });

  return <div className={styles.wrapper}>{renderBookItem}</div>;
};

export default BookCollections;
