import React, { useContext, useEffect } from "react";
import coin from "../icons/coin.svg";
import getUser from "../helpers/getUser";
import ModalCoins from "./modals/ModalCoins";
import useModal from "../hooks/useModal";
import { userContext } from "../App";
import { Link } from "@reach/router";

function Header() {
  const { userName, userPoints, setUserName, setUserPoints } = useContext(
    userContext
  );

  const { isOpen, toggle } = useModal();

  useEffect(() => {
    getUser().then(
      (data) => (setUserName(data.name), setUserPoints(data.points))
    );
  }, []);

  return (
    <>
      <nav className="nav d-flex justify-content-around navbar align-items-center">
        <div
          className="d-flex flex-wrap justify-content-between"
          style={{ width: "20%" }}
        >
          <div onClick={toggle} style={{ fontWeight: 300, cursor: "pointer" }}>
            <i
              className="fas fa-plus-circle coin"
              style={{ color: "#ffcf00", marginRight: 5 }}
            ></i>
            Add more coins
          </div>
          <ModalCoins isOpen={isOpen} hide={toggle} />
          <div>
            <i
              className="fas fa-history history"
              style={{ color: "#ff8800", marginRight: 5 }}
            ></i>
            <Link
              to="/aerolab-challenge-history"
              style={{ color: "#2a2a2a", textDecoration: "none" }}
            >
              Redeem history
            </Link>
          </div>
        </div>
        <div className="div-user d-flex justify-content-center align-items-center flex-wrap">
          {userName != null ? userName : ""}
          <div className="div-coins d-flex align-items-center justify-content-center ml-2">
            {userPoints != "" ? userPoints : ""}
            <img src={coin} alt="Coin" style={{ width: "1.5em" }} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
