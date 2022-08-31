import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAmount } from "../store/reducers/RateReducer";
import { amountChanged } from "../store/actions/RateActions";
import { debounce } from "lodash";

export function AmountField() {
  const dispatch = useDispatch();
  const amount = useSelector(getAmount);
  // useCallback is good when you have a fn thats being passed in as a dependency to useEffect or useMemo, also good when you are passing a callback to a child component, preventing the child component from re-rendering unecessarily
  const changeAmount = useCallback(
    (newAmount) => dispatch(amountChanged(newAmount)),
    []
  );
  const [displayAmount, setDisplayAmount] = useState(amount);
  const onAmountChange = useMemo(
    () => debounce(changeAmount, 500),
    [changeAmount]
  );

  function onChange(e) {
    let newAmount = e.target.value;
    setDisplayAmount(newAmount);
    onAmountChange(newAmount);
  }
  return (
    <form className="ExchangeRate-form">
      <input type="text" value={displayAmount} onChange={onChange} />
    </form>
  );
}
