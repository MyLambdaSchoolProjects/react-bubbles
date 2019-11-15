import React, { useState, useEffect } from "react";
import axiosWithAuth from './Auth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [updateColor, setUpdateColor] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{
    axiosWithAuth()
      .get('/colors')
      .then(res =>{
        setColorList(res.data)
      })
  },[updateColor]);

  const colorUpdate = () =>{
    setUpdateColor(!updateColor);
  }


  return (
    <>
      <button onClick={()=> {localStorage.clear();
        window.location.href = '/';}}>Logout</button>
      <ColorList 
        colors={colorList} 
        updateColors={setColorList} 
        update={colorUpdate}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
