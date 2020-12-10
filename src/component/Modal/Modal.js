import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ onToggle, children }) => {
  const clickHandler = (event) => {
    if (event.target === event.currentTarget) {
      onToggle();
    }
  };

  return (
    <div className={styles.overlay} onClick={clickHandler}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default Modal;
