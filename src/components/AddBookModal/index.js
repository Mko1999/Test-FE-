import React, {useState} from 'react';
import styles from './styles.module.scss';
import {api} from '../../api';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {editBookState} from '../../store/editBook';

const AddBookModal = () => {
  const addBook = useSelector(editBookState);

  const [inputValues, setInputValues] = useState(addBook);

  const saveData = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/books`, {
        body: inputValues,
      });
      toast.success('Successfully Created!');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleInputChange = (e) => {
    if (e) {
      const newObj = _.cloneDeep(inputValues);
      let name = e.target.name.split(' ');
      const key = name[0];
      const subKey = name[1];
      if (subKey) {
        if (Array.isArray(newObj[key])) {
          newObj[key][0][subKey] = e.target.value;
        } else {
          newObj[key][subKey] = e.target.value;
        }
      } else {
        newObj[key] = e.target.value;
      }
      setInputValues(newObj);
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <form onSubmit={saveData} className={styles.form}>
        <label htmlFor="id" className={styles.label}>
          Id
        </label>
        <input
          type="number"
          name="id"
          className={styles.input}
          value={inputValues.id}
          onChange={handleInputChange}
        />
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          name="title"
          className={styles.input}
          value={inputValues.title}
          onChange={handleInputChange}
        />
        <label htmlFor="authors name" className={styles.label}>
          Author(s)
        </label>

        <input
          name="authors name"
          className={styles.input}
          value={inputValues.authors[0].name}
          onChange={handleInputChange}
        />

        <label htmlFor="authors birth_year" className={styles.label}>
          Birth Year
        </label>
        <input
          type="number"
          name="authors birth_year"
          className={styles.input}
          value={inputValues.authors[0].birth_year}
          onChange={handleInputChange}
        />
        <label htmlFor="authors death_year" className={styles.label}>
          Death Year
        </label>
        <input
          type="number"
          name="authors death_year"
          className={styles.input}
          value={inputValues.authors[0].death_year}
          onChange={handleInputChange}
        />
        <label htmlFor="download_count" className={styles.label}>
          Download Count
        </label>
        <input
          type="number"
          name="download_count"
          className={styles.input}
          value={inputValues.download_count}
          onChange={handleInputChange}
        />
        <label htmlFor="bookshelves" className={styles.label}>
          Bookshelves
        </label>
        <input
          name="bookshelves"
          className={styles.input}
          value={inputValues.bookshelves}
          onChange={handleInputChange}
        />
        <label htmlFor="languages" className={styles.label}>
          Languages
        </label>
        <input
          name="languages"
          className={styles.input}
          value={inputValues.languages}
          onChange={handleInputChange}
        />
        <label htmlFor="media_type" className={styles.label}>
          Media Type
        </label>
        <input
          name="media_type"
          className={styles.input}
          value={inputValues.media_type}
          onChange={handleInputChange}
        />
        <label htmlFor="subjects" className={styles.label}>
          Subjects
        </label>
        <input
          name="subjects"
          className={styles.input}
          value={inputValues.subjects}
          onChange={handleInputChange}
        />

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBookModal;
