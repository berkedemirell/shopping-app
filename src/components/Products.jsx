import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Filtered } from "./Filtered.jsx";
import { Context } from "../context/context.js";
import axios from "axios";

export const Products = () => {

  const [isSorted, setIsSorted] = useState(false);
  const [low, setLow] = useState(false);
  const [high, setHigh] = useState(false);
  const [products, setProducts] = useState([]);
  const { setAdded, added } = useContext(Context);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      const data = res.data
      setProducts(data);
    };
    fetchData();
  }, [added])

  const handleAdd = (e) => {
    e.preventDefault();
    setAdded([...added, products[e.target.id]]);
  };
  const value = (e) => {
    if (e.target.value === "low") {
      setLow(!low);
    }
    else if (e.target.value === "high") {
      setHigh(!high);
    }
    setIsSorted(!isSorted)
  };

  return (
    <div className="products-div">
      <h1 className="main-header">Products</h1>
      <div className="sort-div">
        <div className="sort-inner-div">
          <label htmlFor="sort" value="low">
            sort by price(lower to higher)
          </label>
          <input type="checkbox" id="sort" value="low" onClick={value} />
        </div>
        <div className="sort-inner-div">
          <label htmlFor="sort2" value="high">
            sort by price(higher to lower)
          </label>
          <input type="checkbox" id="sort2" value="high" onClick={value} />
        </div>
      </div>
      {!isSorted ? (
        <div className="deneme-div">
          {products.map((product, i) => {
            return (
              <div className="products-inner-div" key={i}>
                <div className="products">
                  <img src={product.image} alt="" className="product-image" />
                  <p className="product-title">{product.title}</p>
                  <h3 className="product-price">${product.price}</h3>
                  <h3 className="product-cat">{product.category}</h3>
                </div>
                <div className="cart-btn">
                  <Link
                    className="add-btn btn"
                    key={i}
                    id={product.id - 1}
                    value={product.id}
                    onClick={handleAdd}
                  >
                    Add to Cart
                  </Link>
                  <Link
                    className="detail-btn btn"
                    to={`/product/${product.id}`}
                  >
                    See Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>{<Filtered low={low} high={high} />}</div>
      )}
    </div>
  );
};

export default Products;
