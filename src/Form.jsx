import React from "react";
import useForm from "./useForm";
import { fireStore } from "./firebase/firebase";


const Form= ({
            data = [],
            setData, 
            user,
        }) => {
    const [value, handleInput, setValue]=useForm({tweet:""});
    
    const {tweet}= value;

    function handleSubmit (e) {
        e.preventDefault()
        //añadiendo tweets
        
        const newTweet={
            ...value,
            uid: user.uid,
            email: user.email,
            author: user.displayName,
            photo: user.photoURL,
            date: Date.now(),
        }
        console.warn(newTweet);

        const addTweet =fireStore.collection("tweets").add(newTweet)  /*Se coloca newTweet en vez de colocar tweet:{tweet} y author:{author}*/
        const getDocument= addTweet.then(doc =>(doc.get()))
        getDocument.then(doc =>{
            const currentTweet={
                username: doc.data().displayName,
                tweet: doc.data().tweet,
                //author:doc.data().author,
                id: doc.id,
                uid: doc.data().uid,
                email:doc.data().email,
                photo: doc.data().photoURL,
                likes: doc.data().likes,
            }
            setData([currentTweet,...data]);  
        });

        setValue({
            tweet:""
            
        });    
    }

    return (
        <form className="formulario">
            <textarea
                name='tweet'
                placeholder=' What’s happening?'
                value={tweet}
                onChange={handleInput}
            />
            {/*<input
                name='author'
                placeholder='Author'
                value={author}
                onChange={handleInput}
    /> Ya no necesitamos alimentar el autor manualmente se asociara al usuario*/}
            <button
                className="btn-tweet"
                onClick={handleSubmit}
            >
                POST
            </button> 
            
        </form>
    )

}    
export default Form
