import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthManager';

const Navbar = () => {
    const auth = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container p-0">
                <Link className="navbar-brand" to="/">
                    APPLE BookStore
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                                Orders
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addBook">
                                Add Book
                            </Link>
                        </li>
                        <li className="nav-item">
                            {auth.user ? <h5 className="nav-link">{auth.user.displayName}</h5> : '' }
                        </li>
                        {auth.user ? (
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => auth.signout()}
                                >
                                    Log Out
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
