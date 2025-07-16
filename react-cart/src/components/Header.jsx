import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-primary d-flex justify-content-between">
                        <ul className="d-flex gap-5 justify-content-center align-items-center p-0 m-0 py-3">
                            <li className="list-unstyled">
                                <NavLink to="/" className="text-light text-decoration-none" style={{ cursor: "pointer" }}>
                                    HOME
                                </NavLink>
                            </li>
                            <li className="list-unstyled">
                                <NavLink to="/about" className="text-light text-decoration-none" style={{ cursor: "pointer" }}>
                                    About
                                </NavLink>
                            </li>
                            <li className="list-unstyled">
                                <NavLink to="/contact" className="text-light text-decoration-none" style={{ cursor: "pointer" }}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="m-0 py-3 p-0">
                            <li className="list-unstyled">
                                <NavLink to="/cart" className="text-light" style={{ cursor: "pointer" }}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
