import { Button, notification } from "antd";
import "./Problem.scss";
import { IoSwapVertical } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useCurrency from "../../hooks/useCurrency";
import SelectCurrency from "../select/SelectCurrency";
import type { ICurrency } from "../../types";

export default function Problem2() {
  const { isLoading: isLoadingCurrency, currencies } = useCurrency();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const [progress, setProgress] = useState(0);
  const [fromCurrency, setFromCurrency] = useState<ICurrency | null>(null);
  const [toCurrency, setToCurrency] = useState<ICurrency | null>(null);
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const swapRate =
    fromCurrency && toCurrency ? fromCurrency?.price / toCurrency?.price : 0;
  const swapRateReverse =
    fromCurrency && toCurrency ? toCurrency?.price / fromCurrency?.price : 0;

  const openNotificationWithIcon = (
    type: "error" | "success",
    message: string
  ) => {
    api[type]({
      message,
    });
  };

  const onChangeAmount = (value: string, type: "from" | "to") => {
    const num = Number(value);
    if (type === "from") {
      setFromAmount(num);
      if (swapRate) {
        setToAmount(num * swapRate);
      }
    } else {
      setToAmount(num);
      if (swapRate) {
        setFromAmount(num / swapRate);
      }
    }
  };

  const swapCoin = () => {
    if (!fromCurrency || !toCurrency) {
      openNotificationWithIcon("error", "Please select a currency");
      return;
    }

    if (!fromAmount || !toAmount) {
      openNotificationWithIcon("error", "Please enter a valid amount");
      return;
    }

    if (!timer.current) {
      setIsLoading(true);
      timer.current = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 100));
      }, 200);
    }
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setToAmount(0);
    setFromAmount(0);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        openNotificationWithIcon("success", "Success swap currency");
        setIsLoading(false);
        setProgress(0);
        setFromAmount(0);
        setToAmount(0);
        clearInterval(timer.current!);
        timer.current = null;
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    if (!fromAmount && toAmount) {
      const newFrom = toAmount / swapRate;
      if (newFrom !== fromAmount) setFromAmount(newFrom);
    } else if (!toAmount && fromAmount) {
      const newTo = fromAmount * swapRate;
      if (newTo !== toAmount) setToAmount(newTo);
    }
  }, [toAmount, fromAmount, fromCurrency, toCurrency, swapRate]);

  return (
    <div className="problem-box">
      {contextHolder}
      <h3>Problem 2: Fancy Form</h3>
      <h5>Create a currency swap form</h5>
      <div className="currency-swap">
        <div className="currency-swap__content">
          <div className="currency-card">
            <div className="currency-card__header">
              <div className="currency-card__section currency-card__section--left">
                <div className="currency-card__title">From</div>
                <input
                  type="number"
                  placeholder="1.00"
                  className="currency-input"
                  value={fromAmount}
                  onChange={(e) => {
                    onChangeAmount(e.target.value, "from");
                  }}
                />
              </div>
              <div className="currency-card__section currency-card__section--right">
                <SelectCurrency
                  selectedCurrency={fromCurrency}
                  setSelectedCurrency={setFromCurrency}
                  isLoading={isLoadingCurrency}
                  currencies={currencies}
                />
              </div>
            </div>
            {fromCurrency && toCurrency && (
              <div className="currency-card__bottom">
                {`1 ${fromCurrency?.currency} = ${swapRate.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 9,
                  }
                )} ${toCurrency.currency}`}
              </div>
            )}
          </div>
          <div className="currency-card">
            <div className="currency-card__header">
              <div className="currency-card__section currency-card__section--left">
                <div className="currency-card__title">To</div>
                <input
                  type="number"
                  placeholder="1.00"
                  className="currency-input"
                  value={toAmount}
                  onChange={(e) => {
                    onChangeAmount(e.target.value, "to");
                  }}
                />
              </div>
              <div className="currency-card__section currency-card__section--right">
                <SelectCurrency
                  selectedCurrency={toCurrency}
                  setSelectedCurrency={setToCurrency}
                  isLoading={isLoadingCurrency}
                  currencies={currencies}
                />
              </div>
            </div>
            {fromCurrency && toCurrency && (
              <div className="currency-card__bottom">
                {`1 ${toCurrency?.currency} = ${swapRateReverse.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 9,
                  }
                )} ${fromCurrency.currency}`}
              </div>
            )}
          </div>
          <div
            className={clsx("swap-progress", isLoading && "loading")}
            style={
              {
                "--progress": progress / 100,
                "--transition": isLoading ? "transform 0.6s ease-out" : "none",
              } as React.CSSProperties
            }
          >
            <div className="swap-action" onClick={swapCurrency}>
              <IoSwapVertical />
            </div>
          </div>
        </div>
        <Button
          disabled={isLoading}
          onClick={swapCoin}
          type="primary"
          size="large"
          shape="round"
        >
          Swap currency
        </Button>
      </div>
    </div>
  );
}
