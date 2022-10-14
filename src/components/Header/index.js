import React from 'react';
import styles from './Header.module.scss';
import {useDispatch} from 'react-redux';
import {PortalWithState} from 'react-portal';
import {AddBookModal, EditBookModal} from '../index';

const Header = () => {
  const dispatch = useDispatch();

  const addBook = () => {};

  return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, isOpen, portal}) => (
        <>
          <div role="button" onClick={openPortal} className={styles.header}>
            <button onClick={addBook} className={styles.button}>
              Add Book
            </button>
          </div>
          {portal(
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <p className={styles.add}>Add Book</p>
                <button className={styles.close} onClick={closePortal}>
                  X
                </button>
              </div>
              <AddBookModal />,
            </div>,
          )}
        </>
      )}
    </PortalWithState>
  );
};

export default Header;
