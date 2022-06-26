import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import '../App.css'


function CreatePost(props){
    let { currentUserId } = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        
        return response.json(); // parses JSON response into native JavaScript objects
      }

      function upload(){
        postData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}/create-post`,{
            title: title,
            text: text,
            img: img,
        }).then(data=>{
            navigate(`/${currentUserId}/feed`, {replace: true})
        })
      }


    return(
        <div className="create-post">
                <h2>Create Post</h2>
                <hr></hr>
                <div className='input-form' id='new-post'>
                    <form>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" id='post-title' required placeholder='Title' />
                        <input onChange={(e) => setText(e.target.value)}  type='text' />
                        <input onChange={(e) => setImg(e.target.value)}  type='text' placeholder="Img Url" />

                    </form>
                    <div className='submit-post'>
                        <button onClick={upload}>Post</button>
                    </div>
                </div>
            </div>
    )
}

export default CreatePost;