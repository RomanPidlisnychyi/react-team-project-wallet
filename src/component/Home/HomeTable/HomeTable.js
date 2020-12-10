import React from "react";
import PropTypes from "prop-types";
import HomeTableItem from "./HomeTableItem";
import styles from "./HomeTable.module.css";

const HomeTable = ({ finance }) => {
  return (
    <div className={styles.financeMobWrapper}>
      <ul className={styles.financeMobList}>
        {finance.map((data) => (
          //  TODO: to HomeTableItem component
          <HomeTableItem key={data._id} data={data} />
        ))}
      </ul>
    </div>
  );
};

HomeTable.propTypes = {
  finance: PropTypes.arrayOf(PropTypes.object),
};

export default HomeTable;
