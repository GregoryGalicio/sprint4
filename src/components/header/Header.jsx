import React from "react";
import "./Header.css";


function Header({ displayName, photoURL}) {
  return (
  
    <div className='header'  >
    <img className="headerImagen" alt={displayName} src={photoURL}/>
    <button className="user">
      <p className="headName">{displayName}</p>
    </button>
   
    </div> 
  );
}

export default Header;
