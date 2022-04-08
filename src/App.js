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

const deleteTweet=(id)=>{
  const updateTweets = data.filter((tweet)=>{
    return tweet.id !== id
  })
  setData(updateTweets);
  fireStore.doc(`tweets/${id}`).delete();
}

  return (
    <BrowserRouter>
    <div className="App">
      <h1>DEVS_UNITED</h1>
      <Form data={data} setData={setData}/>
      {
        data.map(item=>(
          <div key={item.id}>
            <p>{item.tweet}</p>
            <p>Author: <strong>{item.author}</strong></p>
            <button className="delete" onClick={()=>deleteTweet}>
              <img className='imgdelete' alt="imgdelete" src="Vector.png"/>
            </button>
            <hr/>
          </div>
        ))
      } 
    </div>
    </BrowserRouter>
    
  );
}


