import React, { Component } from 'react';
import './productlistingscard.css'
import { Button } from 'reactstrap';
import { HashRouter, Link, withRouter } from 'react-router-dom'
import cartStorage from '../../services/cart'
import instance from '../../services/axios'

class Productlistingscard extends React.Component{



 addToCart=()=>{
  console.log(this.props.info)
  const id = this.props.info.id
  console.log(this.props.info.type )
  if(this.props.info.type === 'profile'){
    instance.get(`product/${id}/products`)
      .then((response)=>{
        console.log('j',response.data.response)
        cartStorage.updateStorage(response.data.response)
      })
  }
  else{
    console.log('this',this.props.info )
    cartStorage.updateStorage([this.props.info])
  }
 }
  

render(){
  console.log('info',this.props.info.type)
    return(<>
          {this.props.info.type === 'activity'? <HashRouter><><Link to={`/product/${this.props.info.id}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter> : this.props.info.type === 'product'? <HashRouter><><Link to={`/product/${this.props.info.id}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter> :
        <HashRouter><><Link to={`/searchview/${this.props.info.id}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>}
        <div className="w3-container w3-card w3-white w3-round w3-margin-right w3-margin-left marginbottom " ><br></br>
        <span className="w3-right w3-opacity">1 min</span>
        
        <div onClick={this.addToCart}>🛒</div>
        <h4>{this.props.name}</h4><br></br>
        <hr className="w3-clear"></hr>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="w3-row-padding" style={{"margin" :"0 -16px"}}>
            <div className="">
              <img src={require('./Crab_Nebula.jpg')} style={{"width" :"100%"}} alt="Northern Lights" className="w3-margin-bottom" className='image'></img>
            </div>
            {/* <div className="w3-half">
              <img src="/w3images/nature.jpg" style={{"width":"100%"}} alt="Nature" className="w3-margin-bottom"></img>
          </div> */}
        </div>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div>
      </>

      
      
            


    )
        }
}

export default Productlistingscard