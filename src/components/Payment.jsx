import React, { useContext, useState } from "react";
import { Context } from "../context/context";
import {Discount} from "./Discount.jsx";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const { added,setAdded } = useContext(Context);
  const cart = added?.map((p) => p);
  const addedPrice = cart?.map(p => p.price)?.reduce((a,b) => a+b,0);
  const [isPaid, setIsPaid] = useState(false)
  const [discountedPrice, setDiscountedPrice] = useState("");
  const navigate = useNavigate();
  const [isDiscount, setIsDiscount] = useState(false)
  const [rate, setRate] = useState("")
  const [message, setMessage] = useState("")
  const [inputs, setInputs] = useState({
    name:"",
    card:Number(""),
    cvv:Number(""),
    valid:Date("")
  })

  const cardV = {
    name:"Berke Demirel",
    card:'123456789',
    cvv:'123',
    valid:'2023-06'
  }

  const handlePay = (e) => {
    e.preventDefault();
    if(cardV.name === inputs.name && cardV.card === inputs.card && cardV.cvv === inputs.cvv && cardV.valid === inputs.valid && added.length) {
      setIsPaid(true)
      setTimeout(() => {
        navigate("/")
      },3000)
      setAdded([])
      setIsDiscount(false)
      setMessage("We have your order. Thank you for choosing us.❤")
    } else if(!added.length) {
      setMessage("You don't have any product in your cart. 🤷‍♂️")
    }
    else {
      setIsPaid(false)
      setMessage("Your card is declaned. Please check your card informations. 🤦‍♂️")
    }
    setTimeout(() => {
      setMessage("")
    },3000)
  }

  const handleChange = e => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  return (
    <div className="payment-div">
        <div className="message-div" style={{color: isPaid ? "green" : "red"}}>
          <h1 className="message-pay">{message}</h1>
        </div>
      <div className="payment-inner-div">
        <p className="total-prod">You have {added?.length} products in your cart.</p>
        <table className="payment-table">
          <thead>
          <tr className="th-row">
            <th className="table-id">Product ID</th>
            <th className="table-title">Product Title</th>
            <th className="table-price">Product Price</th>
          </tr>
          </thead>
          <tbody>
          {added.map((add,i) => {
            return (
              <tr className="td-row" key={i}>
                <td className="payment-id">{add.id}</td>
                <td className="payment-title">{add.title}</td>
                <td className="payment-price">${add.price}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <Discount discountedPrice={discountedPrice} addedPrice={addedPrice} setDiscountedPrice={setDiscountedPrice} setIsDiscount={setIsDiscount} setRate={setRate} isDiscount={isDiscount}/>
          <div className="total">
            <h3 className="total-amount">{!isDiscount ? `Total Price: $${addedPrice}` : `${rate*100}% discount is Applied: $${discountedPrice}`}</h3>
          </div>
      </div>
      <div className="card-det">
        <div className="card">
          <form className="form">
          <div className="card-name-det form-element">
            <label htmlFor="name">Name on the card:</label>
            <input type="text" id="name" name="name" required onChange={handleChange}/>
          </div>
          <div className="card-num-det form-element">
            <label htmlFor="card-number">Card Number:</label>
            <input type="number" id="card-number" name="card" required onChange={handleChange}/>
          </div>
          <div className="card-cvv form-element">
            <label htmlFor="cvv">Cvv: </label>
            <input type="number" id="cvv" name="cvv" required onChange={handleChange}/>
          </div>
          <div className="card-valid form-element">
            <label htmlFor="valid">Valid thru: </label>
            <input type="month" id="valid" name="valid" required onChange={handleChange}/>
          </div>
            <input type="submit" value="Pay" className="pay-btn" onClick={handlePay}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
