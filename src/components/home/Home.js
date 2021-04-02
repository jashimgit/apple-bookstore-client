/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Books from '../book/Books';

const Home = () => {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const url = 'https://rocky-wildwood-14617.herokuapp.com/books';
        fetch(url)
            .then((res) => res.json())
            .then((books) => setBooks(books));
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col text-center">
                    <h4>Search box here </h4>
                </div>
            </div>
            <div className="row">
                {books.map((book) => (
                    <Books key={book._id} item={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;
