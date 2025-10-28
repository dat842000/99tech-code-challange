export interface ICurrencyResponse {
  currency: string;
  date: string;
  price: number;
}

export interface ICurrency extends ICurrencyResponse {
  icon: string;
}
