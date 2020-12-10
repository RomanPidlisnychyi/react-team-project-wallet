import { connect } from "react-redux";
import { loadingAccSelector } from "../../redux/auth/authSelectors";
import Layout from "./layout";

const mapStateToProps = (state) => ({
  loading: loadingAccSelector(state),
});

export default connect(mapStateToProps)(Layout);