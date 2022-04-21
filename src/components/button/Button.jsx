import React from "react";
import "./Button.css";

function Button({ setView}) {
  return (
  
    <div className='buttons' >
    <button className="tweets-feed" type="button" onClick={()=>setView("feed")}>POSTS</button>
    <button className="tweets-favorites" type="button" onClick={()=>setView("favorites")}>FAVORITES</button>   
    </div> 
  );
}

export default Button;
