import { connect } from "react-redux";
import { userNameSelector } from "../../redux/auth/authSelectors";
import Header from "./Header";

const mapStateToProps = (state) => ({
  name: userNameSelector(state),
});
export default connect(mapStateToProps)(Header);
