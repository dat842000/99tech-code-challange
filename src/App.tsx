import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Wrapper from "./components/problems/Wrapper";
import { IoIosLink } from "react-icons/io";
import { REPO_LINK } from "./utils/constant";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="title">Vite + React</div>
      <div className="link-wrapper">
        <a target="_blank" className="repo-link" href={REPO_LINK}>
          {`Repo link`}
          <IoIosLink />
        </a>
      </div>
      <Wrapper />
    </>
  );
}

export default App;
