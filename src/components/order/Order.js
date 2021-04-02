/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthManager";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const auth = useAuth();
//  console.log(auth);
//  const  email = auth.user.email;
//  console.log(email);

  useEffect(() => {
    const email = auth.user.email;

    fetch('https://rocky-wildwood-14617.herokuapp.com/getOrderByUser',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({userEmail: email})
    })
    .then(res => res.json())
    .then(data => setOrders(data))
  }, []);

  const tableRow = orders.map((order) => {
    const {bookName, quantity, price } = order 
    return (
      <tr>
        <td>{bookName}</td>
        <td>{quantity}</td>
        <td>{price}</td>
      </tr>
    )
  })
  
    return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h3 className="display-4">Orders List</h3>
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {tableRow}
            </tbody>
          </table>
          {/* <button className="btn btn-info d-block ml-auto">Checkout</button> */}
        </div>
      </div>
    </div>
  );
};

export default Order;
