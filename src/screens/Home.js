import { Button } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {db} from "../firebase";

export default function Home() {

  const {currentUser, logout} = useAuth()
  const [data, setData] = useState();
  const navigate = useNavigate();

  const fetchPost = async ()=>{
    try{
    const docSnap = await getDoc(doc(db, "users", currentUser && currentUser.email))
    setData(docSnap.data());                
        console.log(data, docSnap.data(), currentUser);
    }catch{

    }
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <div>      
      <h3>E-Mail: {currentUser && currentUser.email}</h3>
      <h3>Username: {data && data.Name}</h3>
      <h3>Mobile Number: {data && data.Mobile}</h3>
    
      <Button variant='contained' onClick={async()=>{await logout(); navigate("/")}}>Log out</Button>    
    </div>
  )
}
