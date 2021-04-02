/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthManager';

const Checkout = () => {
    const [bookItem, setBookItem] = useState({});
    const [orders, setOrders] = useState([]);
    const history = useHistory();
    const {bookId} = useParams();
    const auth = useAuth();
    
    useEffect(() => {
        const url = `https://whispering-chamber-50631.herokuapp.com/book/${bookId}`;
    
        // fetch(url)
        // .then(res => res.json())
        // .then(data => setBookItem(data[0]));
        // console.log('from checkout useEffect',bookItem);

        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            console.log('from checkout ',json[0]);
            setBookItem(json[0]);
        }
        fetchData();
    }, []);


    const handleCheckOut = (bookItem) => {
        // setOrders(bookItem);
        // console.log('log from order', bookItem)
        
        console.log('from orders ', orders);
        
        fetch('https://whispering-chamber-50631.herokuapp.com/orders',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                bookId : `${bookItem._id}`,
                bookName: `${bookItem.bookName}`,
                authorName: `${bookItem.authorName}`,
                price: `${bookItem.price}`,
                quantity: 1,
                userEmail: `${auth.user.email}`,
                orderTime:  new Date().toLocaleString()
            })
        }, [bookItem])
        
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        history.push('/orders');
    }

    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                <h3 className="display-4">Checkout</h3>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bookItem?.bookName}</td>
                            <td>1</td>
                            <td>BDT: {bookItem?.price}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                        <th scope="col">BDT: {bookItem?.price}</th>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-info d-block ml-auto" onClick={() => {handleCheckOut(bookItem)}}>Checkout</button>
                </div>
            </div>
            
        </div>
    );
};

export default Checkout;