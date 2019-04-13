import React, { Component } from 'react';
import { Link, HashRouter } from 'react-router-dom';
import instance from '../../services/axios'
import * as firebase from 'firebase';
import cartStorage from '../../services/cart';
import AuthContext from '../../contexts/auth';


class Cart extends React.Component{
static contextType = AuthContext
state={
   orders : [],
}

componentDidMount(){
    console.log(this.props)
    console.log('cart', cartStorage.getLocalStorage())
    if(cartStorage.getLocalStorage()){
        this.setState({
            orders : (this.state.orders || []).concat(cartStorage.getLocalStorage())
        })
    }
}

render(){
let total = 0
return(
    this.state.orders !== [] ?<>
<div className="col-25">
<div className="container">
  <h4>Cart 
    <span className="price" style={{"color" :"black"}}>
      <i className="fa fa-shopping-cart"></i> 
      <b>{this.state.orders.length}</b>
    </span>
  </h4>
  {
    this.state.orders.map((e,i)=>{
        if(e.price){
            total+=parseInt(e.price)
        }else{
        total +=  0
        }
       return  <p key={i}><a>{e.name}</a> <span className="price">{`${e.price || 0}` }</span></p>


      })
  }

  <hr></hr>
  <p>Total <span className="price" style={{"color" :"black"}}><b>{`${total}`}</b></span></p>
  <HashRouter><Link to='checkout'><button>Check Out</button></Link></HashRouter>
</div>


</div>
 </>
: <h4>Cart is Empty</h4>
)
}
}

export default Cart