import Post from './Post';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";
import '../App.css';





function App(props) {
  let { currentUserId } = useParams();

  const [posts, setPosts] = useState([]);
 


  async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  
  const getPosts = async (calledFrom = 'function') => {
    await fetch('https://hidden-depths-13529.herokuapp.com/posts', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(response => response.json())
        .then(data => {
          let newArr = data.posts_list

          getData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}`)
            .then(userData => {
              let likedArr = userData.user.liked_posts;
              for(let i =0; i < newArr.length; i++){
                if(likedArr.includes(newArr[i]._id)){
                  newArr[i].liked = true;
                }
              } 
              setPosts(newArr)

              
            })
          })
  
       // parses JSON response into native JavaScript objects
      
    }




  useEffect(() => {
    getPosts("useEffect");
  }, [])



  return (
    <div className="App">
      <div className='posts'>
        <div className='create'>
          Home
          <Link to={`/${currentUserId}/create-post`}>
            <button>Create Post</button>
          </Link>
        </div>
        {posts.map((post) => {
          if(post.liked == true)
              return <Post
                postid={post._id}
                user={post.user.username}
                title={post.title}
                text={post.text}
                icon={'lni lni-lni lni-heart-filled size-md'}
                liked={'true'}
                color={{color:'#ec5451'}}
                postUrl = {`https://hidden-depths-13529.herokuapp.com/${currentUserId}/comment/${post._id}`}
                profileLink={`/${currentUserId}${post.user.url}`}
              />;
              return <Post
                postid={post._id}
                user={post.user.username}
                title={post.title}
                text={post.text}
                icon={'lni lni-lni lni-heart size-md'}
                liked={'false'}
                postUrl = {`https://hidden-depths-13529.herokuapp.com/${currentUserId}/comment/${post._id}`}
                profileLink={`/${currentUserId}${post.user.url}`}
              />;
            })}
      </div>
      
    </div>
  );
}

export default App;