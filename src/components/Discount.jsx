import React, { useState } from 'react'

export const Discount = ({addedPrice, setDiscountedPrice, setIsDiscount, setRate, isDiscount}) => {
    const [inputCode, setInputCode] = useState("")
    const codes = [
        {
            code:"BERKE07",
            rate:0.33,
        },
        {
            code:"SAMPIYONBESIKTAS",
            rate:0.90,
        },
        {
            code:"WELCOME00",
            rate:0.50,
        }
    ]
    const handleCode = (e) => {
        if(codes.map((code) => code.code).includes(inputCode) && !isDiscount) {
            const a = codes.filter(c => c.code === inputCode).map(rate => rate.rate)[0];
            setRate(a)
            setIsDiscount(true)
            setDiscountedPrice(addedPrice - (addedPrice * a))
        } else if(isDiscount) {
            alert("You can apply a discount only once.")
        } else {
            alert("Invalid Discount Code.")
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setInputCode(() => e.target.value)
    }
  return (
    <div className='dis-div'>
        <input type='text' placeholder='Code' className='dis-input' name='value' onChange={handleChange}/>
        <button className='dis-btn' onClick={handleCode}>Apply</button>
    </div>
  )
}

export default Discount