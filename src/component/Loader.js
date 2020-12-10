import React from "react";
import ReactLoader from "react-loader-spinner";
import styles from "../globalStyles.module.css";

const Loader = () => (
  <div className={styles.loaderLayout}>
    <ReactLoader
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  </div>
);

export default Loader;
