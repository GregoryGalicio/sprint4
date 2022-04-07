import React, {useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';
import {fireStore} from './firebase/firebase';


export default function App() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    fireStore.collection('tweets').get()
      .then((snapshot) => {
        const docs=[]
        snapshot.forEach(doc =>{
          console.warn(doc.data())
          docs.push(doc.data())
        })
          setData(docs)
        //console.warn(snapshot)
      })
  },[]);
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Hola mundo</h1>
      {
        
        data.map(item=>(
          <div>
            <p>{item.tweet}</p>
            <p>{item.username}</p>
            <p>{item.task}</p>
            <p>{item.done}</p>
          </div>
        ))
      }
    </div>
    </BrowserRouter>
    
  );
}


