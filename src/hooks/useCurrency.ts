import { useEffect, useState } from "react";
import type { ICurrency, ICurrencyResponse } from "../types";

const ICON_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/";

const CURRENCY_BASE_URL = "https://interview.switcheo.com/prices.json";

const EXCEPTION_CURRENCY_NAME: Record<string, string> = {
  STEVMOS: "stEVMOS",
  RATOM: "rATOM",
  STOSMO: "stOSMO",
  STATOM: "stATOM",
  STLUNA: "stLUNA",
};

const useCurrency = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchCurrencyData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(CURRENCY_BASE_URL);
      const data: ICurrencyResponse[] = await response.json();
      // reduce outdate currency
      const latestByCurrency: ICurrencyResponse[] = Object.values(
        data.reduce(
          (acc: Record<string, ICurrencyResponse>, item: ICurrencyResponse) => {
            const existing = acc[item.currency];

            if (!existing || new Date(item.date) > new Date(existing.date)) {
              acc[item.currency] = item;
            }

            return acc;
          },
          {}
        )
      );

      // provide icon url and filter all currency don't have price
      const formattedCurrencies: ICurrency[] = latestByCurrency
        .filter((item) => !isNaN(item.price))
        .map((item) => {
          const iconName =
            EXCEPTION_CURRENCY_NAME[item.currency] || item.currency;

          return {
            ...item,
            icon: `${ICON_BASE_URL}${iconName}.svg`,
          };
        });
      setCurrencies(formattedCurrencies);
    } catch (err) {
      console.log("Failed to fetch currency data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCurrencyData();
  }, []);

  return {
    isLoading,
    currencies,
  };
};

export default useCurrency;
