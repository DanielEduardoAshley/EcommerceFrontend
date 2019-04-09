import React, { Component } from 'react';
import { withRouter, HashRouter, Link } from 'react-router-dom';
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthContext from '../../contexts/auth'
import Searchbar from '../searchbar/searchbar'

class Navbar extends React.Component{



  render(){

  const loggedNav =<><div className="topnav">
  <HashRouter>
      <>
    <Link to='/howitworks' className="active">How It Works</Link>
    <Link to='/profileview'>My Profile</Link>
    <Link to='/sellershop'>Dashboard</Link>
    <Link to='/checkout'>Checkout</Link>
    <Link to='/logout'>Logout</Link>
    <Link to='/cart'>🛒</Link>

    </>
    </HashRouter>
    {/* <Searchbar /> */}
  </div>
  </>

  const unloggedNav =<><div className="topnav">
    <HashRouter>
      <>
    <Link to='/howitworks' className="active">How It Works</Link>
    <Link to='/checkout'>Checkout</Link>
    <Link to='/signin'>Login</Link>
    <Link to='/signup'>Register</Link>
    <Link to='/cart'>🛒</Link>

      </>
    </HashRouter>
    {/* <Searchbar /> */}
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

export default withRouter(Navbar)