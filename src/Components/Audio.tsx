import React from 'react';
import ReactAudioPlayer from "react-audio-player";

export default function Audio() {
 return (
  <div>
   <ReactAudioPlayer src="https://www.redringtones.com/wp-content/uploads/2016/12/seinfeld-theme-song.mp3" controls autoPlay loop/>
  </div>
 );
}