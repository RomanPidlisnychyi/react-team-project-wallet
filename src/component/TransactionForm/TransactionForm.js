import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./TransactionForm.module.css";

import "@pnotify/core/dist/Angeler.css";
import * as PNotifyMobile from "@pnotify/mobile";
import { defaults } from "@pnotify/core";
import { info, defaultModules } from "@pnotify/core";

defaults.width = "350px";
defaults.delay = 2000;
defaultModules.set(PNotifyMobile, {});

const TransactionType = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

class TransactionForm extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    createTransaction: PropTypes.func.isRequired,
  };

  state = {
    date: "",
    type: "-",
    category: "",
    amount: "",
    comments: "",
    transactionType: TransactionType.WITHDRAW,
  };

  componentDidMount() {
    const currentDate = new Date();

    const correctTypeOfDate = currentDate
      .toLocaleDateString()
      .split(".")
      .reverse()
      .join("-");

    this.setState({ date: correctTypeOfDate });
    window.addEventListener("keydown", this.onEscape);
    document.querySelector("body").classList.add(`${styles.onOpenModal}`);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscape);
    document.querySelector("body").classList.remove(`${styles.onOpenModal}`);
  }

  handlerInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlerRadio = (e) => {
    this.setState({
      transactionType: e.target.value,
      type: e.target.value === TransactionType.DEPOSIT ? "+" : "-",
      category: "",
    });
  };

  handlerSubmit = (e) => {
    e.preventDefault();
    const { date, type, category, amount, comments } = this.state;

    const { userId, token, balance } = this.props;
    if(category === "") {
      info({
        text: "Select a category!",
      });
      return;
    }
    const balanceAfter = balance + Number(type + amount);

    const typeBalanceAfter = balanceAfter > 0 ? "+" : "-";

    const transaction = {
      date: Date.parse(date),
      type,
      category,
      amount,
      balanceAfter,
      comments,
      typeBalanceAfter,
    };

    this.props.createTransaction(userId, token, transaction);

    this.props.onToggle();
  };

  onBtnClose = () => this.props.onToggle();

  onEscape = (e) => {
    if (e.code === "Escape") {
      this.props.onToggle();
    }
  };

  render() {
    const { comments, transactionType, category, amount, date } = this.state;

    const isSelectDepositInput = transactionType === TransactionType.DEPOSIT;

    return (
      <form className={styles.form} onSubmit={this.handlerSubmit}>
        <div className={styles.formHeader}>
          <h3 className={styles.title}>Add a transaction</h3>
          <button
            className={styles.buttonCloseModal}
            type="button"
            onClick={this.onBtnClose}
          />
        </div>
        <div className={styles.contenWrapper}>
          <div className={styles.radioGroup} role="group">
            <label className={styles.label}>
              <input
                className={styles.depositeInput}
                type="radio"
                checked={isSelectDepositInput}
                value={TransactionType.DEPOSIT}
                onChange={this.handlerRadio}
              />
              <span>Income</span>
              <span
                className={
                  isSelectDepositInput
                    ? `${styles.radioIconDeposite} ${styles.active}`
                    : `${styles.radioIconDeposite}`
                }
              />
            </label>
            <label className={styles.label}>
              <input
                className={styles.withdrawInput}
                type="radio"
                value={TransactionType.WITHDRAW}
                checked={!isSelectDepositInput}
                onChange={this.handlerRadio}
              />
              <span>Cost</span>
              <span
                className={
                  !isSelectDepositInput
                    ? `${styles.radioIconWithdraw} ${styles.active}`
                    : `${styles.radioIconDeposite}`
                }
              />
            </label>
          </div>

          <select
            className={styles.select}
            name="category"
            value={category}
            onChange={this.handlerInput}
          >
            <option value="" label="Category" disabled />
            {isSelectDepositInput ? (
              <>
                <option value="Salary" label="Salary" />
                <option value="Part time job" label="Part time job" />
              </>
            ) : (
              <>
                <option value="Main Expenses" label="Main Expenses" />
                <option value="Food" label="Food" />
                <option value="Car" label="Car" />
                <option value="Self Care" label="Self Care" />
                <option value="Child Care" label="Child Care" />
                <option value="House" label="House" />
                <option value="Education" label="Education" />
                <option value="Entertainment" label="Entertainment" />
                <option value="Health" label="Health" />
              </>
            )}
          </select>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputCount}
              type="number"
              value={amount}
              name="amount"
              placeholder="0.00"
              onChange={this.handlerInput}
            />
            <input
              className={styles.inputDate}
              type="date"
              name="date"
              value={date}
              onChange={this.handlerInput}
            />
          </div>
          <label className={styles.textAreaLabel}>
            Comment
            <textarea
              className={styles.textArea}
              type="text"
              onChange={this.handlerInput}
              name="comments"
              value={comments}
              placeholder="Add a comments..."
            />
          </label>
        </div>
        <div className={styles.formFooter}>
          <button
            className={styles.buttonAddTransaction}
            type="submit"
            disabled={!amount}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default TransactionForm;
