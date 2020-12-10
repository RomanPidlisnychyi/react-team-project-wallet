import { connect } from "react-redux";
import { totalBalanceSelector } from "../../redux/transactions/transactionsSelectors";
import Balance from "./Balance";

const mapStateToProps = (state) => ({
  balance: totalBalanceSelector(state),
});

export default connect(mapStateToProps)(Balance);
