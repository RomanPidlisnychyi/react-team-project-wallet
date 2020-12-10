import React from "react";
import Header from "../Header/Header.container";
import Container from "../Container/Container";
import NavSection from "../NavSection/NavSection";
import styles from "../../globalStyles.module.css";

const Layout = ({ children, loading }) => (
  <div className={styles.gridContainer}>
    {!loading && <Header />}
    {!loading && <NavSection />}
    {!loading && <Container>{children}</Container>}
  </div>
);

export default Layout;
