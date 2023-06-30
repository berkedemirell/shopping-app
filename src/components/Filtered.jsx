

import React, { useContext } from 'react'
import { Context } from '../context/context'
import { Link } from 'react-router-dom';

export const Filtered = ({low}) => {
    const {products,setAdded,added} = useContext(Context)
    const filtered = products.sort((p1,p2) => low ? p1.price-p2.price : p2.price - p1.price);
    const handleAdd = (e) => {
        e.preventDefault();
        setAdded([...added, filtered[e.target.id]])
        // alert("Product is successfully added")
        // window.location.reload(false)
    }
   return (
    <div className='deneme-div'>
        {filtered.map((product,i) => {
                return (
                <div className='products-inner-div' key={i}>
                    <div className='products'>
                        <img src={product.image} alt='' className='product-image'/>
                        <p className='product-title'>{product.title}</p>
                        <h3 className='product-price'>${product.price}</h3>
                        <h3 className='product-cat'>{product.category}</h3>
                    </div>
                    <div className='cart-btn'>
                        <Link className='add-btn btn' id={i} onClick={handleAdd}>Add to Cart</Link>
                        <Link className='detail-btn btn' to={`/product/${product.id}`}>See Details</Link>
                    </div>
                </div>
                )
            })}
    </div>
  )
}

export default Filtered