import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthContext from '../../contexts/auth'

class Navbar extends React.Component{



  render(){

  const loggedNav =<><div className="topnav">
  <HashRouter>
      <>
    <Link to='/howitworks' className="active">How It Works</Link>
    <Link to='/profileview'>Profile</Link>
    <Link to='/products'>Search</Link>
    <Link to='/product'>Product</Link>
    <Link to='/checkout'>Checkout</Link>
    <Link to='/sellershop'>Shop</Link>
    <Link to='/login'>About</Link>
    <Link to='/logout'>Logout</Link>
    </>
    </HashRouter>
    <input className='search' type="text" placeholder="Search"></input>      
  </div>
  </>

  const unloggedNav =<><div className="topnav">
    <HashRouter>
      <>
    <Link to='/howitworks' className="active">How It Works</Link>
    <Link to='/profileview'>Profile</Link>
    <Link to='/products'>Search</Link>
    <Link to='/product'>Product</Link>
    <Link to='/checkout'>Checkout</Link>
    <Link to='/sellershop'>Shop</Link>
    <Link to='/'>About</Link>
    <Link to='/signin'>Login</Link>
    <Link to='/signup'>Register</Link>
      </>
    </HashRouter>
      <input className='search' type="text" placeholder="Search"></input> 
    </div>
    </>


return(<>
<AuthContext.Consumer>
  {
  (user)=>{
    if(user){
   return loggedNav
    }
    else{
   return unloggedNav
    }
  }
  }
</AuthContext.Consumer>
</>)
}
}

export default Navbar