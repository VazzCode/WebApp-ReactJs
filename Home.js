import { Button } from '@mui/material';
import {collection, doc, getDoc ,getDocs, query} from 'firebase/firestore';
import React, { useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {db} from "../firebase";

export default function Home() {

	// const firestore = firebase.firestore();

    const {currentUser, logout} = useAuth()
	const [messages, setMessages] = useState([])
    const [data, setData] = useState();
    const navigate = useNavigate();
	

    const fetchPost = async ()=>{

    	try{

      		const docSnap = await getDoc(doc(db, "users", currentUser && currentUser.email))
        	setData(docSnap.data());
			docSnap.data().messages.forEach(async dat =>{
				// setMessages(prev =>   [ ...prev , getDoc(doc(db,"messages", data)).data() ])

				let d = await getDoc(doc(db,"messages", dat))
				console.log(d.data());
			})

		}catch(e){
			console.log(e);
		}
    }

	useEffect(() => {
		fetchPost();
	}, [])

	useEffect(() => {
		console.log(messages);
	}, [messages])

  	return (
		<div>      

			<h3>E-Mail: {data && data.Email}</h3>
			<h3>Username: {data && data.Name}</h3>
			<h3>Mobile Number: {data && data.Mobile}</h3>
			
			<Button variant='contained' onClick={async()=>{await logout(); navigate("/")}}>Log out</Button>    
		</div>
  	)
}
