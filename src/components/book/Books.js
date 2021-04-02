/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router';
import './book.css';


const Books = (props) => {
    const history = useHistory();
    const { bookName, authorName, price, imageUrl } = props.item;
    const bookId = props.item._id;
    
    const handleBooking = (id) => {
        history.push(`/book/${id}`);
    }

    return (
        <div className="col-md-3">
            <div className="card mb-4">
                <img src={imageUrl} alt="book" className="card-img-top mx-auto" />
                <div className="card-body">
                    <h4 className="card-title">{bookName}</h4>
                    <h5>{authorName}</h5>
                    
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <span>
                        <b>Price BDT:{price} </b>
                    </span>
                    <button className="btn btn-info" type="button" onClick={() => handleBooking(bookId)}>
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Books;
