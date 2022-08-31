import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { ratesUpdated } from "../store/actions/RateActions";
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from "../store/reducers/RateReducer";
import { RateTable } from "./RateTable";
import { CurrencyCodePicker } from "./CurrencyCodePicker";
import { getExchangeRates } from "../api";
import { AmountField } from "./AmountField";

export function ExchangeRate() {
  const dispatch = useDispatch();
  const supportedCurrencies = useSelector(getSupportedCurrencies);
  const currencyCode = useSelector(getCurrencyCode);
  const updateRates = (rates) => dispatch(ratesUpdated(rates));

  // can also be written: const currencyCode = useSelector((state) => getCurrencyCode(state));
  // or const currencyCode = useSelector((state) => state.rates.supportedCurrencies)

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
          Exchange Rates <CurrencyCodePicker />
        </h1>
      </section>
      <section>
        <AmountField />
      </section>
      <section>
        <RateTable />
      </section>
    </>
  );
}


