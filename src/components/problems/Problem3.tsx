import "./Problem.scss";

const refactoredBlock = `type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
type Prices = Record<string, number>;

interface WalletBalance {
  blockchain: Blockchain;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

declare function useWalletBalances(): WalletBalance[];
declare function usePrices(): Prices;

const PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number =>
  PRIORITY[blockchain] ?? -99;

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const WalletPage: React.FC<DivProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    if (!balances?.length || !prices) return [];

    return balances
      .filter((b) => getPriority(b.blockchain) > -99 && b.amount > 0)
      .map((b) => ({
        ...b,
        formatted: b.amount.toFixed(),
        usdValue: prices[b.currency] * b.amount,
      }))
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances, prices]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
          key={\`\${balance.blockchain}:\${balance.currency}\`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
      {children}
    </div>
  );
};`;

const Problem3 = () => {
  return (
    <div className="problem-box">
      <h3>Problem 3: Messy React</h3>
      <h5>
        List out the computational inefficiencies and anti-patterns found in the
        code block.
      </h5>
      <div className="implementations">
        <div className="implementation">
          <p>The answer:</p>
          <p>
            {`1. The FormattedWalletBalance type should extend from WalletBalance to avoid code duplication.`}
          </p>
          <p>
            {`2. Define a type for WalletPage props. Since the rest of the props are passed to a <div>, use the React.HTMLAttributes<HTMLDivElement> type for proper typing and IntelliSense support.`}
          </p>
          <p>{`3. Define a literal type for Blockchain to ensure type safety and autocomplete support.`}</p>
          <p>
            {`4. Define the PRIORITY constant as a Record<Blockchain, number> to make its type explicit and future-proof.`}
          </p>
          <p>
            {`5. Simplify the getPriority function and move it outside the component to avoid redeclaration on every render.`}
          </p>
          <p>
            {`6. Combine filtering, sorting, and formatting into a single helper function for cleaner and more efficient data processing.`}
          </p>
          <p>
            {`7. Refactor the filter-sort-format logic into a concise, functional-style implementation.`}
          </p>
          <p>
            {`8. The key of WalletRow should not be an index. Instead, it should be a unique string to avoid unnecessary rendering.`}
          </p>
          <p>
            {`9. Ensure that useWalletBalances() and usePrices() return memoized values. If not, use a deep comparison in the dependency array to ensure useMemo behaves correctly.`}
          </p>
          <h2>Refactored code:</h2>
          <div className="code">
            <pre>{refactoredBlock.trim()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem3;
