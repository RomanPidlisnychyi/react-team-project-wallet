import { connect } from "react-redux";
import {
  UIStatisticsTransactionsListSelector,
  totalIncomeBalanceSelector,
  totalCostBalanceSelector,
} from "../../redux/transactions/transactionsSelectors";
import { setFilter } from "../../redux/transactions/transactionsActions";
import Statistic from "./Statistic";

const mapStateToProps = (state) => ({
  dataPoints: UIStatisticsTransactionsListSelector(state),
  totalIncomeBalance: totalIncomeBalanceSelector(state),
  totalCostBalance: totalCostBalanceSelector(state),
});

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
