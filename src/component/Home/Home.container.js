import { connect } from "react-redux";
import { loadingTransactionSelector, reverseTransactionListSelector } from "../../redux/transactions/transactionsSelectors";
import Home from "./Home";

const mapStateToProps = (state) => ({
  items: reverseTransactionListSelector(state),
  loading: loadingTransactionSelector(state),
});

export default connect(mapStateToProps)(Home);
