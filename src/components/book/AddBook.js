import { faPencilAlt, faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
const AddBook = () => {
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState();

  const onSubmit = (data) => {
    // console.log(data);
    const bookInfo = {
      bookName: data.bookName,
      authorName: data.authorName,
      price: data.price,
      imageUrl: imageUrl,
    };
    const url = `https://whispering-chamber-50631.herokuapp.com/add-book`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookInfo),
    }).then((res) => console.log("front ", res));
  };

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "574bd210dc92601c14320e718edd7daf");
    imageData.append("image", e.target.files[0]);

    fetch("https://api.imgbb.com/1/upload", { method: "POST", body: imageData })
      .then((res) => res.json())
      .then((data) => setImageUrl(data.data.display_url));
  };

  
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2 ">
          <ul class="list-group">
          <Link to="/manage-product" class="list-group-item">
            <FontAwesomeIcon icon={faThLarge}  />  Manage Product
            </Link>
            <Link to="/addBook" class="list-group-item">
            <FontAwesomeIcon icon={faPlus} />  Add Book
            </Link>
            <Link to="/" class="list-group-item">
            <FontAwesomeIcon icon={faPencilAlt} />  Edit book
            </Link>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Add Book</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="col-md-6 form-group">
                    <input
                      name="bookName"
                      placeholder="Book name"
                      className="form-control"
                      ref={register}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      name="authorName"
                      placeholder="Author name"
                      className="form-control"
                      ref={register}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 form-group">
                    <input
                      name="price"
                      placeholder="Price"
                      className="form-control"
                      ref={register}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      type="file"
                      name="file"
                      className="form-control-file"
                      ref={register}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <input type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
