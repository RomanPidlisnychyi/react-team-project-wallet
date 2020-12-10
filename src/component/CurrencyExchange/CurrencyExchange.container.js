import { connect } from "react-redux";
import CurrencyExchange from "./CurrencyExchange";
import { currencyExchange } from "../../redux/currency/currencySelectors";

const mapStateToProps = (state) => ({
  actualCurs: currencyExchange(state),
});

export default connect(mapStateToProps)(CurrencyExchange);
