import logo from './logo.svg';
import './App.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login'; 
import Profile from './Components/Profile/Profile'; 
import NotFound from './Components/NotFound/NotFound';
import SendMessage from './Components/SendMessage/SendMessage'
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';















function App() {

let{setToken}=useContext(tokenContext)

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }


  },[])

  const routes = createBrowserRouter([
    {path:"",element: <Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"home",element:<Home/>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"profile",element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
      {path:"message",element:<ProtectedRoutes><SendMessage/></ProtectedRoutes>},{path:"*",element:<NotFound/>}
    ]},{path:"message/:userID",element:<SendMessage/>}
  ])



  return (
  <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
