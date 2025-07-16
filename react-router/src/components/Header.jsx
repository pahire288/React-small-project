import React from "react";
import {NavLink} from 'react-router-dom';
import './Header.css';

function Header()
{
    return(<>
    
   <div className="navbar">
     <NavLink to="/"  style={{cursor:"pointer"}}>Home</NavLink>
    <NavLink to="/About" style={{cursor:"pointer"}}>About</NavLink>
    <NavLink to="/Contact" style={{cursor:"pointer"}}>Contact</NavLink>
   </div>
    </>);
}

export default Header;