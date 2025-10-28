import "./Problem.scss";

/**
 * Using javascript simple loop to sum to n
 */
const sum_to_n_a = `const sum_to_n_a = (n: number) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};`;

/**
 * Using Maths formula of regular series of numbers
 */
const sum_to_n_b = `const sum_to_n_b = (n: number) => {
  return (n * (n + 1)) / 2;
};`;

/**
 * Using javascript's built-in reduce function to sum to n
 */
const sum_to_n_c = `var sum_to_n_c = function(n:number): number {
    if (n === 1) return 1;
    return (sum_to_n_c(n-1) + n );
};`;

const Problem1 = () => {
  return (
    <div className="problem-box">
      <h3>Problem 1: Three ways to sum to n</h3>
      <h5>
        Provide 3 unique implementations of the following function in
        JavaScript.
      </h5>
      <div className="implementations">
        <div className="implementation">
          <p>Implementation 1: Using javascript simple loop to sum to n</p>
          <div className="code">
            <pre>{sum_to_n_a.trim()}</pre>
          </div>
        </div>
        <div className="implementation">
          <p>
            Implementation 2: Using Maths formula of regular series of numbers
          </p>
          <div className="code">
            <pre>{sum_to_n_b.trim()}</pre>
          </div>
        </div>
        <div className="implementation">
          <p>
            Implementation 3: This function uses recursion to calculate the sum
            of all numbers from 1 to n
          </p>
          <div className="code">
            <pre>{sum_to_n_c.trim()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
