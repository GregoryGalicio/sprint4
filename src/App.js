import React, {useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
import './index.css'
import './App.css';
import {fireStore} from './firebase/firebase';
import Form from "./Form";


export default function App() {
  const[data,setData]=useState([])
  useEffect(()=>{
    fireStore.collection('tweets').get()
      .then((snapshot) => { 
        console.log(snapshot)
        const docs = []
        snapshot.forEach(doc =>{  //usamos forEach y no map posiblemente por version de firebase
          const snap={
            tweet: doc.data().tweet,
            author:doc.data().author,
            id: doc.id

          }
          docs.push(snap) //del array vacio docs=[] se añade el objeto snap={twets:doc.data(aca se usa el metodo doc).tweet .... con el metodo  PUSH}
        })
          setData(docs)
        //console.warn(snapshot)
      })
  },[]);

const deleteTweet=(id) => {
  //Filtramos State con el documento q no se necesita con Array (data es el array).filter
  const updateTweets = data.filter((tweet) => {
    return tweet.id !== id
  });
  //actualizamos nuestro state con el array updateTweets actualizado  (ya filtrado )
  setData(updateTweets);

  //actualizamos nuestro state con el array updateTweet actualizado esto para borrar documento de Firebase
  fireStore.doc(`tweets/${id}`).delete();
};

  return (
    <BrowserRouter>
    <div className="App centered column">
      <h1>DEVS_UNITED</h1>
      <Form data={data} setData={setData}/>
      <section className="tweets">
        {data.map((item) => (
          <div className="tweet" key={item.id}>
            <div className="tweet-content">
              <p>{item.tweet}</p>
              <small>Author: <strong>@{item.author}</strong></small>
              <hr/>
            </div>
            <div className="tweet-actions">
              <button className="likes">
                <img className='like' alt="like" src="corazon.svg"/>
                <span>5</span>
              </button>
            </div>
            <button className="delete" onClick={() => deleteTweet(item.id)}>
              <img className='imgdelete' alt="imgdelete" src="Vector.png"/>
            </button>
          </div>
        ))} 
      </section>
    </div>
    </BrowserRouter>
  );
}


