import { Component, useEffect, useState } from "react";
import axios from 'axios'





function Loading(){

  const [playlistLink, setPlaylistLink] = useState()


  async function mixRideRequest(){
    var options = {
      method: 'POST',
      url: 'http://127.0.0.1:8000/mrf/'
    };
  
    await axios.get('http://127.0.0.1:8000/mrf/',{})
    .then(function(response){
      console.log(response)
      setPlaylistLink(response.data["playlist_link"])
    })
    .catch(function(error){
      console.log(error)
    })
  
  
  }



  useEffect(()=>{
    mixRideRequest()
  },[])
  return(
    <>
      Creating Playlist Link 
      <a href ='${playlistLink}'>Here it is</a>
    </>
  )
}

export default Loading;

