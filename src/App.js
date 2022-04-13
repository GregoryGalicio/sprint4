import React, {useEffect, useState } from 'react';
import { BrowserRouter,/* Switch, Route, Link */} from 'react-router-dom';
//import logo from './logo.svg';
import './index.css'
import './App.css';
import {fireStore, loginWithGoogle, logout, auth} from './firebase/firebase';
import Form from "./Form";
import RingLoader from "react-spinners/RingLoader";



export default function App() {
  const[data,setData]=useState([]);
  const[loading, setLoading]=useState(true);
  const[favorites, setFavorites]=useState([]);
  const[view, setView]=useState("feed");
  const[user, setUser]= useState(null);

  useEffect(()=> {
    const disconnect= fireStore.collection('tweets')
    .onSnapshot((snapshot) =>{
    });

    auth.onAuthStateChanged((user)=> {
      console.warn('LOGGED WITH:',user);
      console.warn('UID:',user.uid);
      setUser(user); 
      
    });  
    return () =>{disconnect()}
  },[]);

  useEffect(()=>{
  
    const unsubscribe=
    fireStore.collection('tweets')
    .onSnapshot((snapshot) => { 
        console.log(snapshot)
        const docs = []
        snapshot.forEach(doc =>{  //usamos forEach y no map posiblemente por version de firebase
          const snap={
            tweet: doc.data().tweet,
            author:doc.data().author,
            id: doc.id,
            likes: doc.data().likes,
          }
          docs.push(snap) //del array vacio docs=[] se añade el objeto snap={twets:doc.data(aca se usa el metodo doc).tweet .... con el metodo  PUSH}
        });
          
          setData(docs);
          setLoading(false);
          setFavorites(docs.filter(item=>{
            return item.likes>0;
          
          }));
        //console.warn(snapshot)
      });
      return()=>{
        unsubscribe();
      };
    
  },[]);



const deleteTweet=(id) => {
  
  const userConfirm = window.confirm("Estas seguro de borrar este tweet?");

  if(userConfirm){
     //Filtramos State con el documento q no se necesita con Array (data es el array).filter
  const updateTweets = data.filter((tweet) => {
    return tweet.id !== id
  });
  //actualizamos nuestro state con el array updateTweets actualizado  (ya filtrado )
  setData(updateTweets);

  //actualizamos nuestro state con el array updateTweet actualizado esto para borrar documento de Firebase
  fireStore.doc(`tweets/${id}`).delete();
  }
};



/*@description Funcion que actualiza likes en la base de datos*/
function likeTweet(id, likes){
  const innerLikes = likes||0;
  /*console.log(id);*/
  fireStore.doc(`tweets/${id}`).update({likes:innerLikes+1});
}

  return (
    <BrowserRouter>
    <div className="App centered column">
      <section className="login">
        {user &&( 
          <div classNam='user-info'>
            <p>Hola {user.displayName}  </p>
            <img alt={user.displayName} src={user.photoURL}/>
          </div>
        )}
        <button className="btn-login" type="button" onClick={user?logout:loginWithGoogle}>
          {user? 'Cerrar': 'Iniciar' }Sesión
        </button>
      </section>
      <h1>DEVS_UNITED</h1>
      {user&& (
      <Form 
        
        data={data} 
        setData={setData}
        user={user || {}}
      />
      )}
      {
        loading?<RingLoader className="loader" color={"#477A0C"} loading={loading} size={100} />:
        <section className="tweets">
          <button className="tweets-button" type="button" onClick={()=>setView("feed")}>Tweets</button>
          <button className="tweets-fav" type="button" onClick={()=>setView("favorites")}>Favorites</button>
        {(view === "feed"?data:favorites).map((item) => (
          <div className="tweet" key={item.id}>
            <div className="tweet-content">
              <p>{item.tweet}</p>
              <hr/>
              <img alt={item.author} src={item.photo}/>
              <small> Author: <strong>@{item.author}</strong></small>
            </div>
            <div className="tweet-actions">
              <button onClick={() => likeTweet(item.id, item.likes)} className="likes">
                <img className='like' alt="like" src="corazon.svg"/>
                {/*<span>{item.likes?item.likes:0}</span>*/}
                <span>{item.likes||0}</span>
              </button>
            </div>
            <button className="delete" onClick={() => deleteTweet(item.id)}>
              <img className='imgdelete' alt="imgdelete" src="Vector.png"/>
            </button>
          </div>
        ))} 
      </section>
      }
      
    </div>
    </BrowserRouter>
  );
}


