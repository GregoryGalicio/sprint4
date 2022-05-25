import React from 'react';
import "./HomePage.css";


const HomePage = ({loginWithGoogle}) => {
    return (
        <div>
        <br/>
        <br/>
        <img className='devs-united' alt="devs" src="logo big.svg"/>
        <h1 className="titulo1">BIENVENIDOS AL TWEET PEGASINO</h1>
        <h1 className="titulo2">a social network dedicated to programmers</h1>
        <button className="btn-login" type="button" onClick={loginWithGoogle}>
          <img className='signIn' alt="signIn" src="google sign in 2.svg"/> 
        </button>
        <br/>
        <p className="footer">
        © 2022 Devs_United - <span>BETA</span>
        </p>
      </div>
    );
}

export default HomePage;