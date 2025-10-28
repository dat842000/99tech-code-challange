import { Tabs } from "antd";
import Problem1 from "./Problem1";
import Problem3 from "./Problem3";
import Problem2 from "./Problem2";

const renderProblem = (index: number) => {
  switch (index) {
    case 1:
      return <Problem1 />;
    case 2:
      return <Problem2 />;
    case 3:
      return <Problem3 />;
  }
};

export default function Wrapper() {
  return (
    <div>
      <Tabs
        type="card"
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Problem ${id}`,
            key: id,
            children: renderProblem(i + 1),
          };
        })}
      />
    </div>
  );
}
