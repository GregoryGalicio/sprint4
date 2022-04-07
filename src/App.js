import React, {useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import {fireStore} from './firebase/firebase';
import Form from "./Form";


export default function App() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    fireStore
      .collection('tweets')
      .get()
      .then((snapshot) => {
        const docs= snapshot.map(doc =>{
          return{
            tweet: doc.data().tweet,
            author:doc.data().author,
            id: doc.id
          }
        })
          setData(docs)
        //console.warn(snapshot)
      })
  },[]);
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Hola mundo</h1>
      <Form data={data} setData={setData}/>
      {
        data.map(item=>(
          <div key={item}>
            <p>{item.tweet}</p>
            <p>{item.author}</p>
            <p>{item.task}</p>
            <p>{item.done}</p>
          </div>
        ))
      }
    </div> 
    </BrowserRouter>
    
  );
}


