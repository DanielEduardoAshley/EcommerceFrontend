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
    console.log('cart', cartStorage.getLocalStorage())
    this.setState({
        orders : (this.state.orders || []).concat(cartStorage.getLocalStorage())

    })

}

render(){
let total = 0
return(
<div class="col-25">
<div class="container">
  <h4>Cart 
    <span class="price" style={{"color" :"black"}}>
      <i class="fa fa-shopping-cart"></i> 
      <b>{this.state.orders.length}</b>
    </span>
  </h4>
  {
    this.state.orders.map((e,i)=>{
        total +=  parseInt(e.price)
       return  <p key={i}><a>{e.name}</a> <span class="price">{`$${e.price}`}</span></p>


      })
  }
  {/* <p><a>Product 1</a> <span class="price">$15</span></p>
  <p><a>Product 2</a> <span class="price">$5</span></p>
  <p><a>Product 3</a> <span class="price">$8</span></p>
  <p><a>Product 4</a> <span class="price">$2</span></p> */}
  <hr></hr>
  <p>Total <span class="price" style={{"color" :"black"}}><b>{`${total}`}</b></span></p>
  <HashRouter><Link to='checkout'><button>Check Out</button></Link></HashRouter>
</div>
</div>
)
}
}

export default Cart