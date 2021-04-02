/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Books from '../book/Books';

const Home = () => {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
                
        async function allBooks() {
            const response = await fetch('https://whispering-chamber-50631.herokuapp.com/books')
            const data = await response.json()
            setBooks(data);
        }
        allBooks();
        
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
