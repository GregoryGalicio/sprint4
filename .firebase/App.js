import React, {useEffect, useState } from 'react';
// import { BrowserRouter ,Route ,Routes /* Switch, Route, Link */} from 'react-router-dom';
//import logo from './logo.svg';
import './index.css'
import './App.css';
import {fireStore, loginWithGoogle, logout, auth} from './firebase/firebase';
import Form from "./Form";
import RingLoader from "react-spinners/RingLoader";
// import Home from './Home';
// import Feed from './Feed';
import Head from "./components/head/Head";
import Header from "./components/header/Header";
import Button from "./components/button/Button";
import HomePage from "./components/homePage/HomePage";


export default function App() {
  const[data,setData]=useState([]);
  const[favorites, setFavorites]=useState([]);
  const[view, setView]=useState("feed");
  const[loading, setLoading]=useState(true);
  const[user, setUser]= useState(null);
 

  useEffect(() => {
    const unsubscribe = fireStore
      .collection("tweets")
      .orderBy("date")
      .onSnapshot(snapshot => {
        const docs = []
        snapshot.forEach(doc => {

          const snap = {
            username : doc.data().username,
            tweet: doc.data().tweet,
            author:doc.data().author,
            id: doc.id,
            email:doc.data().email,
            uid:doc.data().uid,
            likes: doc.data().likes,
            photo:doc.data().photo,
            date:doc.data().date,
          
          };

          docs.unshift(snap) //en vez de push para agregarlo al principio

        })

        setData(docs)
        setLoading(false)
       // setFavorites(docs.filter(item=>{
        //return item.likes>0;}))
        
      });

    auth.onAuthStateChanged((user) => {
      //console.warn('LOGGED WITH:', user);
      setUser(user)

      if (user){
        fireStore.collection('users').get()
          .then( snapshot => {
            snapshot.forEach( doc => {

              const userDoc = doc.data() //habia doc.data() lo cambie por sanpshot.data() y funciono
              if (userDoc.uid === user.uid){
                setUser({
                ...user, ...userDoc
              })
            }
          })
        })
      }
    });

    return () => {
      unsubscribe()
    }
  }, []);

  useEffect(() => {
    if (user){
      if(data.length && user.favorites && user.favorites.length){
        const favorites= user.favorites.map(favoritesId => {
          const tweetFavorites = data.find(item => item.id === favoritesId)
          // console.log(data, favoritesId)
          return tweetFavorites
        })
          .filter( item => item !==undefined)
          setFavorites(favorites)
          // console.log('FAVORITESSSSS',favorites)
      }
      

      // console.log('DATA',data)
      // console.log('Entrando al efecto', user)

      const findUser = fireStore.collection('users').where("uid","==",user.uid).get();

      findUser.then((query)=>{
        // console.log('query', query.empty)

        //si el usuario con campo uid NO existe en la collection "users"; empty === true
        //si el usuario con campo uid SI existe en la collection "users"; emprty === false

        if (query.empty) {
        	fireStore.collection('users').add({
        		uid: user.uid,
        		displayName: user.displayName, //aca colocaron name en vez de userName
        		photo: user.photoURL,
            email: user.email,
            favorites:[],
        	});
        }
      })
    }
  }, [user, data])



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
  fireStore.doc(`tweets/${id}`).update({likes: innerLikes + 1});

  fireStore.collection("users")
    .get()
    .then(snapshot =>{
      snapshot.forEach(doc => {
        const userDoc=doc.data()
        if (userDoc.uid === user.uid){
          //console.log(doc.id)
          fireStore.doc(`users/${doc.id}`).update({
            favorites: [...userDoc.favorites, id]
          })
        }
      })
    })
    setUser({
      ...user, favorites:[...user.favorites, id]
    })
}


  return (
    
    <div className="App centered column">
      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
      </Routes>
      </BrowserRouter> */}
      <section className="login">
      {user===null && 
      <HomePage loginWithGoogle={loginWithGoogle}/>
      }
        
        {user &&
          // <div classNam='user-info'>
          //   <p>!!Hola {user.displayName}!!</p>
          //   <img className="headImagen" alt={user.displayName} src={user.photoURL}/>
          // </div>
        
          <Head
          displayName={user.displayName}
          logout={logout}
          />
          
        }
        {user &&
          <Header
          displayName={user.displayName}
          photoURL={user.photoURL}
          />
        }
        <br/>
        {user && <Button
        setView={setView}
        />}
  
        {user &&(
      <Form 
        data={data} 
        setData={setData}
        user={user || {}}
      />
      )}

      </section>
      
      {
        loading?<RingLoader className="loader" color={"#477A0C"} loading={loading} size={100} />:
        <section className="tweets">
         

        {user &&(view === "feed"?data:favorites).map((item) => (
          
          <div className="tweet" key={item.id}>
            <div className="photo">
              <img alt={item.author} src={item.photo}/>
            </div>
            <div className="tweet-content">
              <div className="head">
                <div className="headTweet">
                <button className="userTweet">
                   <p >{item.author}</p>
                </button>
                <p>-{new Date(item.date).toLocaleDateString("es-PE",{day:"numeric"})} {new Date(item.date).toLocaleDateString("es-PE",{month:"short"})}</p>
                </div>
                
                {
                (user!==null && user.uid === item.uid ) &&
                <button className="delete" onClick={() => deleteTweet(item.id)}>
                  <img className='imgdelete' alt="imgdelete" src="Vector.png"/>
                </button>
              }
              </div>  
              <div className="tweetContent1">
              <p >{item.tweet}</p>
              </div>
              
              <small className="footerTweet">
                  <strong>{item.email}</strong>
                  <button onClick={() => likeTweet(item.id, item.likes)} className="likes">
                    <img className='like' alt="like" src="corazon.svg"/>
                    <span>{item.likes||0}</span>
                  </button>
              </small>
            </div>
            
            
          </div>
          
        ))} 
      </section>
        }
    </div>
  );
}


