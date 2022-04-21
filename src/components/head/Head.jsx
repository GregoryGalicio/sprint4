import React from "react";
import "./Head.css";

function Head({ displayName, logout }) {
  return (
    <div className='user-info'>
    <p className="displayName"> HOLAA! {displayName}!!</p>
    <button className="btn-logout" type="button" onClick={logout}>
      <p className="log">LOGOUT</p>
      <img className='logout' alt="logout" src="logout.svg"/>
    </button>
  </div>
  );
}

export default Head;
