import React, {useEffect,useContext} from 'react'
import styles from './Home.module.css'
import { Link,useNavigate } from 'react-router-dom'


import { tokenContext } from '../../Context/tokenContext'










export default function Home() {

  let {token,setToken}= useContext(tokenContext)
  let navigate = useNavigate()
  

let handleRedirect=(token)=>{
  if(token){
    navigate('/profile')
  }

}

useEffect(()=>{
handleRedirect(token)

},[token])
  

  
  return (
<div className="container text-center my-5">
  <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
  <div className="buttons d-flex justify-content-center align-items-center  flex-column">
    <Link to={'/login'} className="btn btn-default-outline my-4"><i className="fas fa-user" /> Login</Link>
    <Link to={'/register'} className="btn btn-default-outline"><i className="far fa-edit" /> Register</Link>
  </div>
</div>

  )
}
