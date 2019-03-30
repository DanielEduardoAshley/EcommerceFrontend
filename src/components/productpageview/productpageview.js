import React, { Component } from 'react';
import './productpageview.css'
import { Button } from 'reactstrap';
import Productlistingscard from '../productlistingscard/productlistingscard'
import Sidedashboard from '../sidedashboard/sidedashboard'

class ProductPageView extends React.Component{
render(){
    return (
        <>
    <div className="productrow">
        {/* <Productlistingscard/> */}
                <div className="w3-row-padding " style={{"margin" :"0 -16px"}}>
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
    <br></br>
 

    <div className="productdescription">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
    </div>
        


        <div className='featuredproductsrow'>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./Crab_Nebula.jpg')} className='productimg'></img></div>
        </div>
        </>
    )
}
}

export default ProductPageView