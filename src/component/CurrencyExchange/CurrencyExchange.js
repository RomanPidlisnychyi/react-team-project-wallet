import React from "react";
import PropTypes from "prop-types";
import styles from "./currencyExchange.module.css";

const CurrencyExchange = ({ actualCurs }) => (
  <div className={styles.wrap}>
    <table className={styles.currencyTable}>
      <thead>
        <tr className={styles.currencyTable__head}>
          <td>Currency</td>
          <td>Sale</td>
          <td>Purshase</td>
        </tr>
      </thead>
      {actualCurs.length > 0 && (
        <tbody>
          {actualCurs.map((point) => (
            <tr key={point.ccy} className={styles.currencyTable__body}>
              <td className={styles.currencyTable__body__item}>{point.ccy}</td>
              <td className={styles.currencyTable__body__item}>
                {point.sale.substring(0, 5)}
              </td>
              <td className={styles.currencyTable__body__item}>
                {point.buy.substring(0, 5)}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  </div>
);

CurrencyExchange.propTypes = {
  actualCurs: PropTypes.array.isRequired,
};
export default CurrencyExchange;
