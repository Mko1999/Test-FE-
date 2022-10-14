import styles from './styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {bookActions, bookState} from '../../store/books';
import {api} from '../../api';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

const EditBookModal = ({id}) => {
  const dispatch = useDispatch();

  const bookSelector = useSelector(bookState);

  const {selectedBook} = bookSelector;

  const saveData = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${selectedBook.id}`, {
        body: selectedBook,
      });
      toast.success('Successfully Edited !');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleInputChange = (e) => {
    const selectors = e.target.name.split(' ');
    const newObj = _.cloneDeep(selectedBook);
    if (selectors.length > 1) {
      const item = newObj[selectors[0]][e.target.dataset.index];
      item[selectors[1]] = e.target.value;
    } else {
      newObj[e.target.name] = e.target.dataset.array
        ? e.target.value.split(',')
        : e.target.value;
    }
    dispatch(bookActions.chooseBook(newObj));
  };

  const renderFormats =
    selectedBook &&
    selectedBook.formats &&
    Object.values(selectedBook.formats).map((item, index) => {
      return (
        <a className={styles.formatLink} key={index} href={item}>
          {item}
        </a>
      );
    });

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <form onSubmit={saveData} className={styles.form}>
          <label htmlFor="id" className={styles.label}>
            Id
          </label>
          <input
            type="number"
            name="id"
            value={selectedBook.id}
            onChange={handleInputChange}
            className={styles.input}
          />
          <label htmlFor="authors name" className={styles.label}>
            Author(s)
          </label>
          {selectedBook?.authors?.map((author, index) => (
            <input
              key={index}
              name="authors name"
              data-index={index}
              // eslint-disable-next-line react/prop-types
              value={author.name}
              onChange={handleInputChange}
              className={styles.input}
            />
          ))}
          <label htmlFor="authors birth_year" className={styles.label}>
            Birth Year
          </label>
          {selectedBook?.authors?.map((author, index) => (
            <input
              type="number"
              key={index}
              name="authors birth_year"
              data-index={index}
              // eslint-disable-next-line react/prop-types
              value={author.birth_year}
              onChange={handleInputChange}
              className={styles.input}
            />
          ))}
          <label htmlFor="authors death_year" className={styles.label}>
            Death Year
          </label>
          {selectedBook?.authors?.map((author, index) => (
            <input
              type="number"
              key={index}
              name="authors death_year"
              data-index={index}
              // eslint-disable-next-line react/prop-types
              value={author.death_year}
              onChange={handleInputChange}
              className={styles.input}
            />
          ))}
          <label htmlFor="download_count" className={styles.label}>
            Download Count
          </label>
          <input
            type="number"
            name="download_count"
            value={selectedBook.download_count}
            onChange={handleInputChange}
            className={styles.input}
          />
          <label htmlFor="bookshelves" className={styles.label}>
            Bookshelves
          </label>
          <input
            name="bookshelves"
            data-array={1}
            value={selectedBook.bookshelves}
            onChange={handleInputChange}
            className={styles.input}
          />
          <label htmlFor="media_type" className={styles.label}>
            Media Type
          </label>
          <input
            name="media_type"
            value={selectedBook.media_type}
            onChange={handleInputChange}
            className={styles.input}
          />
          <div className={styles.formats}>{renderFormats}</div>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

EditBookModal.propTypes = {
  id: PropTypes.number,
};

export default EditBookModal;
