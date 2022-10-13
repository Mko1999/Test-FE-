// import React, {useRef} from 'react';
// import styles from './styles.module.scss';
// import PropTypes from 'prop-types';

// import {useLockBodyScroll, useOnClickOutside} from '../../hooks';
// import {useSelector} from 'react-redux';
// import {bookSelector} from '../../store/books';
//
// const BookModal = ({item}) => {
//   const {showModal, selectedBook} = useSelector(bookSelector);
//   useLockBodyScroll(showModal);
//   console.log(showModal, 'show');
//
//   const modalRef = useRef(null);
//
//   useOnClickOutside(modalRef, close);
//
//   return (
//     <div className={styles.wrapper}>
//       {showModal ? (
//         <div ref={modalRef} className={styles.modal}>
//           <button onClick={close}>Close</button>
//           <div className={styles.content}>dasd</div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };
//
// export default BookModal;
//
// BookModal.propTypes = {
//   show: PropTypes.bool,
//   close: PropTypes.func,
//   item: PropTypes.any,
// };

import {PortalWithState} from 'react-portal';

const BookModal = () => {
  return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, isOpen, portal}) => (
        <>
          <button onClick={openPortal}>Open Portal</button>
          {portal(
            <p>
              This is more advanced Portal. It handles its own state
              <button onClick={closePortal}>Close me!</button>, hit ESC or click
              outside of me.
            </p>,
          )}
        </>
      )}
    </PortalWithState>
  );
};

export default BookModal;
