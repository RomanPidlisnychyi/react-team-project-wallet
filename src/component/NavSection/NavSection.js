import React from "react";
import { NavLink, Route } from "react-router-dom";
import Balance from "../Balance/Balance.container";
import CurrencyExchange from "../CurrencyExchange/CurrencyExchange.container";
import styles from "./NavSection.module.css";

const NavSection = () => (
  <section className={styles.section}>
    <div className={styles.sectionContainer}>
      <nav className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/"
              exact
              className={styles.link}
              activeClassName={styles.isActive}
            >
              <p>Home</p>
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/stats"
              className={styles.link}
              activeClassName={styles.isActive}
            >
              <p>Statistic</p>
            </NavLink>
          </li>
          {document.documentElement.clientWidth < 768 && (
            <li className={styles.item}>
              <NavLink
                to="/currencies"
                className={styles.link}
                activeClassName={styles.isActive}
              >
                <p>Currencies</p>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {document.documentElement.clientWidth < 768 && (
        <Route path="/" component={Balance} />
      )}
      {document.documentElement.clientWidth >= 768 && <Balance />}
      {document.documentElement.clientWidth >= 1280 && <CurrencyExchange />}
    </div>
  </section>
);

export default NavSection;
