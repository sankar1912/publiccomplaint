import React, { useState } from 'react'
import  Cookies from 'js-cookie';
import { TextField } from '@mui/material';
function Body() {
  const [fname,setname]=useState('');
  function setcookiename()
  {
    Cookies.set("Name",fname);
    alert("Name is saved gto cookies")
  }
  return (
    <div>
      <p>Enter your name :</p><TextField
       onChange={(e)=>{
        setname(e.target.value);
      }}>{fname} </TextField>
      <button onClick={setcookiename} > Submit
      </button>
    </div>
  )
}

export default Body