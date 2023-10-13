import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  let navigate = useNavigate()
  const submitRegister = async (values) => {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        'https://sara7aiti.onrender.com/api/v1/user',
        values
      );
      console.log(data);
      if (data.message == 'Added') {
        setApiError("")
        setIsLoading(false);
        navigate('/login')
      }
    } catch (error) {
      setApiError(error.response.data.error);
      console.log(error.response.data.error);
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, 'Maximum name chars are 15 characters')
      .min(3, 'Minimum name chars are 3 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid format').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/,
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*).'
      )
      .required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")],'Passwords must match'),
    age: Yup.number()
      .min(10, 'min is 10')
      .max(100, 'max is 100')
      .required('age is required'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      age: '',
    },
    validationSchema,
    onSubmit: (values) => {
      submitRegister(values);
    },
  });

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="far fa-edit user-icon" ></i>
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
        <form onSubmit={formik.handleSubmit}>
          <input
            className="form-control"
            placeholder="Enter your Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? 
            <div className="alert alert-danger">{formik.errors.name}</div> : ''}
          <input
            className="form-control my-2 "
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? 
            <div className="alert alert-danger">{formik.errors.email}</div> : ''}
          <input
            className="form-control my-2"
            placeholder="Enter your Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? 
            <div className="alert alert-danger">{formik.errors.password}</div> : ''}
          <input
            className="form-control my-2 "
            placeholder="Password Confirmation"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? 
            <div className="alert alert-danger">{formik.errors.rePassword}</div> : ''}
          <input
            className="form-control  my-2"
            placeholder="Age"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.age && formik.touched.age ? 
            <div className="alert alert-danger">{formik.errors.age}</div> : ''}
          <button
            type="submit"
            className="btn btn-default-outline my-4 w-100 rounded"
          >
            {isLoading ? <i className="fa fa-spin fa-spinner"></i> : <><i className="far fa-edit"></i> Register</>}
          </button>
          <Link className="btn btn-default-outline" to={'/login'}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
