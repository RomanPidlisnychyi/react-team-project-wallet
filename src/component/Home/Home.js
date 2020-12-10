import React from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import HomeTable from "./HomeTable/HomeTable";
import Welcome from "./Welcome/Welcome";
import CurrencyExchange from "../CurrencyExchange/CurrencyExchange.container";
import Modal from "../Modal/Modal";
import TransactionForm from "../TransactionForm/TransactionForm.container";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import Toggler from "../Toggler";
import styles from "./Home.module.css";
import fade from "../Modal/Modal.module.css";

const Home = ({ items, loading }) => (
  <>
    <Toggler>
      {({ isOpen, onToggle }) => (
        <>
          <CSSTransition
            in={isOpen}
            classNames={fade}
            timeout={250}
            unmountOnExit
          >
            <Modal onToggle={onToggle}>
              <TransactionForm onToggle={onToggle} />
            </Modal>
          </CSSTransition>
          {!isOpen && <OpenModalButton onToggle={onToggle} />}
        </>
      )}
    </Toggler>

    <section className={styles.financeMobSection}>
      {items.length === 0 && !loading && <Welcome />}
      {!loading && <HomeTable finance={items} />}
    </section>

    <div className={styles.currencySection}>
      <CurrencyExchange />
    </div>
  </>
);

Home.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Home;
