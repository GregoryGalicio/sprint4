import React from "react";
import useForm from "./useForm";
import { fireStore } from "./firebase/firebase";

const Form= ({data=[],setData})=>{
    const [value, handleInput, setValue]=useForm({
        tweet:"",
        author:"",
    })
    const {tweet, author}= value;

    function handleSubmit (e) {
        e.preventDefault()
        //añadiendo tweets
        const addTweet =fireStore.collection("tweets").add(value)  /*Se coloca value en vez de colocar tweet:{tweet} y author:{author}*/
        const getDocument= addTweet.then(doc =>(doc.get()))
        getDocument.then(doc =>{
            const newTweet={
                tweet: doc.data().tweet,
                author:doc.data().author,
                id: doc.id
            }
            setData([newTweet,...data]);  
        });

        setValue({
            tweet:"",
            author:"" 
        });
        
    }
    return (
        <form className="formulario">
            <textarea
                className="EscribirTweet"
                name='tweet'
                placeholder='Escribe tu Tweet'
                value={tweet}
                onChange={handleInput}
            />
            <div className="input-group">
            <input
                name='author'
                placeholder='Author'
                value={author}
                onChange={handleInput}
            />
            <button
                className="btn-tweet"
                onClick={handleSubmit}
            >
                Submit
            </button>
            </div>
            
        </form>
    )

}    
export default Form
