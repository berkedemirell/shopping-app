import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CartDetails } from "./CartDetails.jsx";
import { Context } from "../context/context.js";

export const Navbar = () => {
  const [isCart, setIsCart] = useState(false);
  const {added} = useContext(Context)
  return (
    <div className="nav-div">
      <nav className="nav">
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="nav-link-item" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link-item">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link-item">Work for us</Link>
          </li>
          {
            <div>
              <li className="nav-item">
                <button className="nav-link-item-btn" onClick={() => setIsCart(!isCart)}>Cart({added.length})</button>
              </li>
              {isCart ? <CartDetails setIsCart={setIsCart} isCart={isCart}/> : ""}
            </div>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
