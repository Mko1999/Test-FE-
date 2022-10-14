import React from 'react';
import styles from './Header.module.scss';

import {PortalWithState} from 'react-portal';
import {AddBookModal} from '../index';

const Header = () => {
  return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, portal}) => (
        <>
          <div className={styles.header}>
            <button onClick={openPortal} className={styles.button}>
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
