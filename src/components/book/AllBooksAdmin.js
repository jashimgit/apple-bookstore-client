/* eslint-disable no-restricted-globals */
import { faPencilAlt, faPlus, faThLarge, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooksAdmin = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://whispering-chamber-50631.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);


  // handling delete books item


  const handleDeleteBook = (id, event) => {
    // console.log('clicked, ', event.target.parentElement.parentElement);
    fetch(`https://whispering-chamber-50631.herokuapp.com/delete-book/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      // console.log('Deleted Successfully');
      event.target.parentElement.parentElement.style.display='none';
    })
  }

  const bookRow = books.map((book) => {
    const { bookName, price, authorName, _id } = book;
    return (
      <tr>
        <td>{bookName}</td>
        <td>{authorName}</td>
        <td>BDT: {price}</td>
        <td>
          <button className="btn btn-info btn-sm" type="button">
          <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button className="btn btn-danger btn-sm " type="button" onClick={()=>handleDeleteBook(_id, event)}>
          <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-2 ">
          <ul class="list-group">
            <Link to="/manage-product" class="list-group-item">
            <FontAwesomeIcon icon={faThLarge} />  Manage Product
            </Link>
            <Link to="/addBook" class="list-group-item">
            <FontAwesomeIcon icon={faPlus} />  Add Book
            </Link>
            <Link to="/" class="list-group-item">
            <FontAwesomeIcon icon={faPencilAlt} />  Edit book
            </Link>
          </ul>
        </div>
        <div className="col-md-9 card ml-1">
          <div className="card-body">
            <h5 className="card-title">All Book List</h5>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{bookRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooksAdmin;
