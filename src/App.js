import React, { Component } from 'react';
import './App.css';
import {withRouter,Link, HashRouter, Route, Switch} from 'react-router-dom'
import ProfileView from './components/profileview/profileview'
import HowItWorksPage from './components/howitworkspage/howitworkspage'
import SplashPage from './components/splashpage/splashpage'
import Navbar from './components/navbar/navbar'
import ProductListingsView from './components/productlistingsview/productlistingsview'
import ProductPageView from './components/productpageview/productpageview'
import Checkout from './components/checkout/checkout'
import Signin from './components/login/login'
import Signup from './components/signup/signup'
import Logout from './components/logout/logout'
import Sellersshopview from './components/sellersshopview/sellersshopview'
import SearchView from './components/searchview/searchview'
import Searchbar from './components/searchbar/searchbar'


import firebase from './firebase';
import AuthContext from './contexts/auth';

class App extends Component {
  state={
      user: null,
}

componentDidMount() {
  this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    }
    else {
      this.setState({ user: null })
    }
  })
}

componentWillUnmount() {
  this.unsubscribe()
}


  render() {
    // const num = 1
    // let list = this.props.history.location.pathname.split('/')
    console.log('these',this.props)
    return (<>

      <AuthContext.Provider value={this.state.user}>
      <div>
      {/* {num === 0 ? <SplashPage/>: <Navbar/>} */}
<HashRouter>
  <>
  <Navbar/>
<Searchbar/>
  {/* {list[1] !== 'search'?<Searchbar />: null } */}

  
  <Switch>
  <Route path='/profileview' exact component={ ProfileView }/>
  <Route path='/searchview' exact component={ SearchView }/>
  <Route path='/howitworks' exact component={ HowItWorksPage }/>
  <Route path='/search/:search'   component={Searchbar}/>
  <Route path='/product' exact component={ ProductPageView }/>
  <Route path='/signin' exact component={ Signin }/>
  <Route path='/logout' exact component={ Logout }/>
  <Route path='/signup' exact component={ Signup }/>
  <Route path='/checkout' exact component={ Checkout }/>
  <Route path='/sellershop' exact component={ Sellersshopview }/>
  <Route path='/splash' exact component={ SplashPage }/>
  </Switch>

  </>
</HashRouter>
      </div>
      </AuthContext.Provider>

      </>
    );
  }
}

export default App;
