import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../component/Layout/layout.container";
import Home from "../../component/Home/Home.container";
import { userIdSelector, userTokenSelector } from "../../redux/auth/authSelectors";
import { getTransactions } from "../../redux/transactions/transactionOperations";
import { currencyExchangeOperation } from "../../redux/currency/currencyOperation";

const HomePage = () => {
  const dispatch = useDispatch();

  const userId = useSelector(userIdSelector);
  const userToken = useSelector(userTokenSelector);

  useEffect(() => {
    if(userId === undefined) return;
    dispatch(getTransactions(userId, userToken));
    dispatch(currencyExchangeOperation());
  });

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
