import React, { useContext } from "react";
import { Context } from "../context/context";
import { Link } from "react-router-dom";

export const CartDetails = ({setIsCart, isCart}) => {
  const {added, handleDelete,setAdded} = useContext(Context);
  const cart = added?.map((p) => p);
  const addedPrice = cart?.map(p => p.price)?.reduce((a,b) => a+b,0);

  const handleAdd = (e) => {
    e.preventDefault();
    setAdded([...added, cart[e.target.id]])
    // alert("Product is successfully added")
    // window.location.reload(false)
}

  return (
    <div className="cart-details-cont">
      <div className="cart-details-inner-cont">
        <h3 className="detail-header">Products in your cart ({cart?.length})</h3>
        <div className="line"></div>
        {cart.map((prod,i) => {
          return (
            <div className="prod-cont" key={i} id={prod.id}>
              <p className="prod-number">{i+1}.</p>
              <div className="prod-count">
                <h3 className="prod">{prod.title}</h3>
                <div className="deneme">
                  <h3 className="prod-price">${prod.price}</h3>
                </div>
              </div>
        
              <div className="prod-btns-div">
                <button className="delete" id={prod.id} onClick={() => handleDelete(i)}>-</button>
                <button className="add" id={i} onClick={handleAdd}>+</button>
              </div>
            </div>
          );
        })}
        <h3 className="aggr">Aggregate: ${addedPrice}</h3>
        {cart.length ? <div className="buy-btn-div">
          <Link to="/payment"><button className="buy-btn" onClick={() => setIsCart(!isCart)}>Purchase</button></Link>
        </div> : ""}
      </div>
    </div>
  );
};

export default CartDetails;
