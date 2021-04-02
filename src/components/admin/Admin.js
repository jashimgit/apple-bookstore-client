import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-md-3 h-100 d-block">
                    
                    <ul class="list-group">
                        <Link to="/manage-product" class="list-group-item">Manage Product</Link>
                        <Link to="/addBook" class="list-group-item">Add Book</Link>
                        <Link to="/" class="list-group-item">Edit book</Link>
                        
                    </ul>
                    
                </div>
                <div className="col-md-7 card ml-1">
                    <h4>content</h4>
                </div>
            </div>
        </div>
    );
};

export default Admin;