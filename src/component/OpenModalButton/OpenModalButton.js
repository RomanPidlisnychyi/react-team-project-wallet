import React from 'react';
import PropTypes from 'prop-types';
import styles from './OpenModalButton.module.css';

const OpenModalButton = ({ onToggle }) => {
  const onBtnClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    onToggle();
  };

  return (
    <>
      <div className={styles.buttonOverlay} />
      <button
        className={styles.buttonOpenModal}
        type="button"
        onClick={onBtnClick}
      >
        +
      </button>
    </>
  );
};

OpenModalButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default OpenModalButton;
