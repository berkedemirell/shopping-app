import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState(() => {
    const savedAdded = localStorage.getItem("added");
    if (savedAdded) {
      return JSON.parse(savedAdded);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("added", JSON.stringify(added));
    const fetchData = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    };
    fetchData();
  }, [added]);

  const handleAdd = (e) => {
    e.preventDefault();
    setAdded([...added, products[e.target.id]]);
    // alert("Product is successfully added")
    //window.location.reload()
  };

  const handleDelete = (i) => {
    const newList = added.filter((add, index) => {
      if (index === i) {
        return false;
      } else {
        return true;
      }
    });
    // window.location.reload(false);
    setAdded(newList);
  };

  return (
    <Context.Provider
      value={{ products, added, handleDelete, handleAdd, setAdded, setProducts }}
    >
      {children}
    </Context.Provider>
  );
};
