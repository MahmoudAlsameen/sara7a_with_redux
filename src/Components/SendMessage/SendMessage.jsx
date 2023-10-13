import React, { useState } from 'react'
import styles from './SendMessage.module.css'
import avatar from '../../images/avatar.png'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { sendMessage } from "../../Redux/MessagesSlice";
import { useDispatch } from "react-redux";


export default function SendMessage() {
  
    let params = useParams()
    const dispatch = useDispatch();

const SendMessage= async (values)=>{
  

      dispatch(sendMessage({...values}));
      

}


let formik = useFormik({
initialValues:{
  messageContent:"",
  receivedId:params.userID
}
,onSubmit:(values)=>{
SendMessage(values)
formik.values.messageContent=""
formik.values.receivedId=""
}

})


  return (
<div>
  <div className="container text-center py-5 my-5 text-center">
    <div className="card py-5 mb-5">
      <a data-toggle="modal" data-target="#profile">
        <img src={avatar} className="avatar " alt="profile pic" />
      </a>
      <h3 className="py-2">profile name</h3>
      <div className="container w-50 m-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="receivedId" className='mb-2'>Enter the user id you want to send message to:</label>
          <input name='receivedId' id='receivedId' value={formik.values.receivedId} placeholder="Enter the user id you want to send message to" className="form-control mb-2" type="text" onChange={formik.handleChange} />
          <textarea className="form-control" name="messageContent" value={formik.values.messageContent} onChange={formik.handleChange} cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
          <button className="btn btn-outline-info mt-3" type='submit'><i className="far fa-paper-plane" /> Send</button>
        </form>
      </div>
    </div>
  </div>
  {/*  Share profile Modal */}
  
</div>
  )
}
