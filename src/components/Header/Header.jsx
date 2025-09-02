import { useContext } from "react";
import SalesContext from "../../contexts/SalesContext";
import "./Header.css";

const Header = ({ title }) => {
  const { closeSideBar, setCloseSideBar } = useContext(SalesContext);
  return (
    <header className="text-center">
      <h1 className="heading">
        {title}{" "}
        <span className="sidebar-hamburger">
          <button
            className={`btn btn-light btn-sidebar ${closeSideBar ? "open" : ""}`}
            onClick={() => setCloseSideBar(!closeSideBar)}
          >
            {closeSideBar ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </button>
        </span>
      </h1>
    </header>
  );
};

export default Header;
