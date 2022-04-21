import React, { useEffect, useState }from 'react';
import {useNavigate} from  'react-router-dom';
import Feed from './Feed';
import {loginWithGoogle, auth} from './firebase/firebase';


export default function Home() {
    const [user, setUser] = useState(null);
    

    auth.onAuthStateChanged((user)=>{
        console.log( "usuario logeado");
        setUser(user);
    })

    useEffect((user) => {
        if(user !== null){
            navigate("/feed")
        }
        
    }, [user])

    function fnLogin () {
        loginWithGoogle();
        setUser(user);
    }
    
    const navigate=useNavigate()
  return (
    <div>
       <h1>Pagina principal HOMEEE</h1> 
       <img className='devs-united' alt="devs" src="logo big.svg"/>
        <h1 className="titulo1">BIENVENIDOS AL TWEET PEGASINO</h1>
        <h1 className="titulo2">a social network dedicated to programmers</h1>
        <button className="btn-login" type="button" onClick={fnLogin}>
          <img className='signIn' alt="signIn" src="google sign in 2.svg"/> 
        </button>
    </div>
  )
}
