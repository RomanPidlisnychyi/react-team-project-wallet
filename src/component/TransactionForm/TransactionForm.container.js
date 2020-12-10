import { connect } from "react-redux";
import TransactionForm from "./TransactionForm";
import { createTransaction } from "../../redux/transactions/transactionOperations";
import {
  userIdSelector,
  userTokenSelector,
} from "../../redux/auth/authSelectors";
import { totalBalanceSelector } from "../../redux/transactions/transactionsSelectors";

const mapStateToProps = (state) => ({
  balance: totalBalanceSelector(state),
  userId: userIdSelector(state),
  token: userTokenSelector(state),
});

const mapDispatchToProps = {
  createTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
