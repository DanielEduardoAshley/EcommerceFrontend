import React, { Component } from 'react';
import instance from '../../services/axios'
import * as firebase from 'firebase';


class Cart extends React.Component{

render(){

return(
<div class="col-25">
<div class="container">
  <h4>Cart 
    <span class="price" style={{"color" :"black"}}>
      <i class="fa fa-shopping-cart"></i> 
      <b>4</b>
    </span>
  </h4>
  <p><a>Product 1</a> <span class="price">$15</span></p>
  <p><a>Product 2</a> <span class="price">$5</span></p>
  <p><a>Product 3</a> <span class="price">$8</span></p>
  <p><a>Product 4</a> <span class="price">$2</span></p>
  <hr></hr>
  <p>Total <span class="price" style={{"color" :"black"}}><b>$30</b></span></p>
</div>
</div>
)
}
}

export default Cart