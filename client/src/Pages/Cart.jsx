import React, { useEffect, useState } from 'react'
import axios from "axios";

const Cart = () => {

  const [data, setData] = useState([]);

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    return axios.get(`https://lime-fawn-veil.cyclic.app/cart`)
      .then((r) => {
        setData(r.data)
        console.log(r.data);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>Cart</div>
  )
}

export default Cart