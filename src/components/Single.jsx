

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import { Context } from '../context/context';

export const Single = () => {
    const [single, setSingle] = useState({})
    const id = window.location.pathname.split("/")[2];
    const {handleAdd,products} = useContext(Context)

    useEffect(() => {
        const fetchSingle = async () => {
            const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setSingle(res.data)
        }
        fetchSingle();
    },[id])
  return (
    <div className='single-container'>
        <h1 className='single-header'>Product Details</h1>
        {id <= products.length ? <div className='single-inner-container'>
            <img src={single.image} className='single-image' alt=''/>
            <div className='single-rate'>
                <h3 className='single-title'>{single.title}</h3>
                <p className='single-rating'>Rating: {single.rating?.rate}/5 ({single.rating?.count})</p>
            </div>
            <h3 className='single-price'>${single.price}</h3>
            <p className='single-desc'>{single.description}</p>
            <button className='add-btn-details' id={single.id-1} onClick={handleAdd}>Add to Cart</button>
        </div> : "Nothing Found"}
    </div>
  )
}

export default Single