import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ratesUpdated } from "../store/actions/RateActions";
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from "../store/reducers/RateReducer";
import { RateTableContainer } from "./RateTable";
import { CurrencyCodePickerContainer } from "./CurrencyCodePicker";
import { getExchangeRates } from "../api";
import { AmountFieldContainer } from "./AmountField";

export function ExchangeRate({ currencyCode, updateRates, supportedCurrencies }) {

  useEffect(() => {
      getLatestExchangeRates();
  }, [currencyCode]);

  
  function getLatestExchangeRates() {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      updateRates(rates);
    });
  }
    return (
      <>
        <section>
          <h1 className="ExchangeRate-header">
            Exchange Rates <CurrencyCodePickerContainer />
          </h1>
        </section>
        <section>
          <AmountFieldContainer />
        </section>
        <section>
          <RateTableContainer />
        </section>
      </>
    );
}

// props types
ExchangeRate.propTypes = {
  updateCurrencyCode: PropTypes.func,
  currencyCode: PropTypes.string,
  supportedCurrencies: PropTypes.arrayOf(PropTypes.string),
};

// redux stuff
function mapStateToProps(state) {
  return {
    supportedCurrencies: getSupportedCurrencies(state),
    currencyCode: getCurrencyCode(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateRates: (rates) => dispatch(ratesUpdated(rates)),
  };
}
export const ExchangeRateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRate);
