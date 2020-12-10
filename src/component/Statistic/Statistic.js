import React, { Component } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "./canvasjs.react";
import Select from "react-select";
import selectOptMonth from "./selectOptMonth";
import styles from "./statistic.module.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const countOfYears = [1, 2, 3, 4, 5];
const selectOptYear = [];

class Statistic extends Component {
  state = {
    month: "",
    year: "",
  };

  componentDidMount() {
    const currentDate = new Date();
    let initialYear = currentDate.getFullYear();
    const initialMonth = currentDate.getMonth() + 1;
    const initialDay = "01";

    const currentFormatStartDate = [initialYear, initialMonth, initialDay].join(
      "-"
    );

    const currentFormatEndDate = Date.now();

    const parsedStartDate = Date.parse(currentFormatStartDate);

    this.props.setFilter({ start: parsedStartDate, end: currentFormatEndDate });

    const initialMonthOption = {
      value: initialMonth,
      label: selectOptMonth.find((item) => Number(item.value) === initialMonth)
        .label,
    };
    const initialYearOption = { value: initialYear, label: initialYear };

    this.setState({ month: initialMonthOption, year: initialYearOption });

    countOfYears.forEach((e) => {
      if (selectOptYear.length < 1) {
        selectOptYear.push({
          value: initialYear,
          label: initialYear,
        });
        return;
      }
      if (selectOptYear.length < 5) {
        initialYear -= 1;
        selectOptYear.push({
          value: initialYear,
          label: initialYear,
        });
      }
    });
  }

  filterGenerator = (year, month) => {
    const startDate = new Date(year, month - 1, "01");
    const endDate = new Date(year, month, 0, 23, 59, 59);

    this.props.setFilter({
      start: Date.parse(startDate),
      end: Date.parse(endDate),
    });
  };

  handlerMonthInput = (e) => {
    const { year } = this.state;
    const { value, label } = e;
    this.setState({ month: { value, label } });
    this.filterGenerator(year.value, value);
  };

  handlerYearInput = (e) => {
    const { month } = this.state;
    const { value, label } = e;
    this.setState({ year: { value, label } });
    this.filterGenerator(value, month.value);
  };

  render() {
    const { month, year } = this.state;
    const dataPoints = this.props.dataPoints;
    const totalIncomeBalance = this.props.totalIncomeBalance;
    const totalCostBalance = this.props.totalCostBalance;

    const options = {
      theme: "white",
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "pie",
          legendText: "{category}",
          toolTipContent: "{category}: <strong>{amount}</strong>",
          indexLabel: "{category}",
          indexLabelPlacement: "inside",
          indexLabelFontColor: "White",
          dataPoints: dataPoints,
        },
      ],
    };

    return dataPoints.length > 0 || totalIncomeBalance > 0 ? (
      <div className={styles.statistics}>
        <h2 className={styles.statistic_main_title}>Statistics</h2>
        <div className={styles.desctop_container}>
          <div className={styles.container}>
            <div className={styles.chart}>
              {dataPoints.length > 0 ? (
                <CanvasJSChart options={options} />
              ) : (
                <p className={styles.chart_error}>
                  There is no any information about costs! Please add some
                  costs!
                </p>
              )}
            </div>
          </div>
          <div className={styles.main_section}>
            <div className={styles.select__section}>
              <Select
                options={selectOptMonth}
                value={month}
                className={styles.select__input}
                onChange={this.handlerMonthInput}
                placeholder="Месяц"
              />
              <Select
                value={year}
                className={styles.select__input}
                onChange={this.handlerYearInput}
                placeholder="Год"
                options={selectOptYear}
              />
            </div>
            <div className={styles.statistic_container}>
              <div className={styles.statistic}>
                <div className={styles.statistic__title}>
                  <p className={styles.statistic__category}>Category</p>
                  <p className={styles.statistic__total}>Total</p>
                </div>
                <ul
                  className={
                    totalCostBalance > 0
                      ? styles.statistic__list
                      : styles.statistic__list_error
                  }
                >
                  {dataPoints.map((base) => (
                    <li key={base.category} className={styles.list__item}>
                      <p className={styles.category_section}>
                        <span
                          style={{ backgroundColor: base.color }}
                          className={styles.label_before}
                        />
                        <span className={styles.item__label}>
                          {base.category}
                        </span>
                      </p>
                      <p>{base.amount}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={(styles.container, styles.costs_section)}>
                <h3 className={styles.costs}>
                  <p className={styles.costs_title}>Costs:</p>
                  <span className={styles.costs_total}>
                    {totalCostBalance}{" "}
                    <span className={styles.costs_desc}>UAH</span>
                  </span>
                </h3>
                <h3 className={styles.costs}>
                  <p className={styles.costs_title}>Incomes:</p>
                  <span className={styles.income_total}>
                    {totalIncomeBalance}{" "}
                    <span className={styles.costs_desc}>UAH</span>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.statistics}>
        <h2 className={styles.statistic_main_title}>Statistics</h2>
        <div className={styles.desctop_container}>
          <div className={styles.main_section}>
            <div className={styles.select__section}>
              <Select
                options={selectOptMonth}
                value={month}
                className={styles.select__input}
                onChange={this.handlerMonthInput}
                placeholder="Месяц"
              />
              <Select
                value={year}
                className={styles.select__input}
                onChange={this.handlerYearInput}
                placeholder="Год"
                options={selectOptYear}
              />
            </div>
            <h2 className={styles.error__title}>
              There is no any information for statistic creation. Please add
              some information about statistics!
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

Statistic.propTypes = {
  dataPoints: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      balanceAfter: PropTypes.number,
      category: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      comments: PropTypes.string,
      createdAt: PropTypes.string,
      date: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      typeBalanceAfter: PropTypes.string,
      updatedAt: PropTypes.string,
      y: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
  setFilter: PropTypes.func.isRequired,
  totalCostBalance: PropTypes.number.isRequired,
  totalIncomeBalance: PropTypes.number.isRequired,
};

export default Statistic;
