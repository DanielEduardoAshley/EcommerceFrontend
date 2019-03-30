import React, { Component } from 'react';
import './sellersshopview.css'
import { Button } from 'reactstrap';


const Sellersshopview=(props)=>{


    return(
            <>
           <div className="sellerproduct">
           <div className="w3-card w3-round w3-white sellerrow">
        <div className="w3-container">
         <h4 className="w3-center">My Profile</h4>
         <p className="w3-center"><img src={require("./galaxy.jpg")} className="w3-circle" style={{"height" : "106px" , "width":"106px" , "transform":"rotate(90deg)"}} alt="Avatar"></img></p>
         <hr></hr>
         <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
         <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
         <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1993</p>
        </div>
      
        {/* <div className="w3-card w3-round w3-white w3-hide-small">
        <div className="w3-container">
          <p>Interests</p>
          <p>
            <span className="w3-tag w3-small w3-theme-d5">News</span>
            <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>
            <span className="w3-tag w3-small w3-theme-d3">Labels</span>
            <span className="w3-tag w3-small w3-theme-d2">Games</span>
            <span className="w3-tag w3-small w3-theme-d1">Friends</span>
            <span className="w3-tag w3-small w3-theme">Games</span>
            <span className="w3-tag w3-small w3-theme-l1">Friends</span>
            <span className="w3-tag w3-small w3-theme-l2">Food</span>
            <span className="w3-tag w3-small w3-theme-l3">Design</span>
            <span className="w3-tag w3-small w3-theme-l4">Art</span>
            <span className="w3-tag w3-small w3-theme-l5">Photos</span>
          </p>
        </div>
      </div>
      <br></br> */}
      
      
      </div>
      <br></br>



        {/* <Productlistingscard/> */}
                <div className="w3-row-padding " style={{"margin" :"0 -16px"}}>
                    <div className="">
                        <img src={require('./shop.png')} style={{"width" :"100%"}} alt="Northern Lights" className="w3-margin-bottom" className='image'></img>
                    </div>
            {/* <div className="w3-half">
              <img src="/w3images/nature.jpg" style={{"width":"100%"}} alt="Nature" className="w3-margin-bottom"></img>
          </div> */}
                </div>
        {/* <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button>   */}

         


    
     
    </div>
    <br></br>
 

    <div className="sellerdescription">
        <p>Featured Products</p>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p> */}
    </div>
        

        <div className='featuredshoprow'>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        <div className='column-2'><img src={require('./galaxy.jpg')} className='productimg'></img></div>
        </div>


        
      
        </>
    
            


    )

}

export default Sellersshopview