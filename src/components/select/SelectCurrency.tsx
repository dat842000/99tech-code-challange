import { useState, type Dispatch, type SetStateAction } from "react";
import { FaAngleDown } from "react-icons/fa";
import type { ICurrency } from "../../types";
import "./SelectCurrency.scss";
import clsx from "clsx";
import { Spin } from "antd";

type SelfProps = {
  selectedCurrency: ICurrency | null;
  setSelectedCurrency: Dispatch<SetStateAction<ICurrency | null>>;
  currencies: ICurrency[];
  isLoading?: boolean;
};

export default function SelectCurrency({
  selectedCurrency,
  setSelectedCurrency,
  isLoading,
  currencies,
}: SelfProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCurrency = (currency: ICurrency) => {
    setSelectedCurrency(currency);
  };

  return (
    <>
      <div className="select-currency" onClick={handleClick}>
        <div
          className={clsx(
            "select-currency-select",
            !selectedCurrency?.currency && "default"
          )}
        >
          {selectedCurrency && (
            <img
              src={selectedCurrency.icon}
              className="select-currency-image"
              width={24}
              height={24}
            />
          )}

          <span className={clsx(`select-currency-text`)}>
            {selectedCurrency?.currency || "Select"}
          </span>
          <FaAngleDown />
        </div>
        {isOpen && (
          <div className="select-currency-menu">
            {isLoading && <Spin />}
            {!isLoading &&
              currencies.map((currency) => (
                <div
                  className={clsx(
                    `select-option`,
                    currency.currency === selectedCurrency?.currency &&
                      "selected"
                  )}
                  key={`${currency.currency}`}
                  onClick={() => handleSelectCurrency(currency)}
                >
                  <img
                    src={currency.icon}
                    className="select-currency-image"
                    width={20}
                    height={20}
                  />
                  <div>{currency.currency}</div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
