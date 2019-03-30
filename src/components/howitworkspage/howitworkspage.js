import React, { Component } from 'react';
// import { Carousel } from 'reactstrap'
import './howitworkspage.css'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
const stepOne = require('./step1.png')
const stepTwo = require('./step2.png')

class HowItWorksPage extends React.Component{

render(){
  const images = [
    {
      original: stepOne,
      thumbnail: stepOne,
      
    },
    {
      original: stepTwo,
      thumbnail: stepTwo,
    },
   
  ]
return (
<>
<ImageGallery items={images} />

 {/* <div className='nav'>Customer Care   |   Today's Offer   |   Download App   |   Advertise   |   Sell Product   |   Track Order   |   Gift Cards   |   Contact Us   |   Sign Up */}
 {/* <div className='search'></div> */}
 {/* <div className='searchoptions'>Electronics Clothing Furniture Men Women Home Appliances Books Mobiles Tv's Computers</div> */}
 {/* </div> */}

{/* <div className='font'>The New Social Construct</div> */}
{/* <div className='row '> */}
{/* <div className=' header '>Avatar</div> */}

{/* <img src={require("./avatarthree.png")}  className="w3-circle headerimg" style={{"height" : "100px" , "width" : "100px"}} alt="Avatar"></img> */}
{/* <img src={require("./template.png")}  className="w3-circle" style={{"height" : "500px" , "width" : "1000px"}} alt="Avatar"></img> */}
 {/* </div> */}
{/* <div className='font  ' style={{'marginLeft': '30px', 'marginBottom': '30px'}}>Welcome to Your New Reality</div> */}

{/* <div className='font'>Shop Featured Profiles</div>
<div className='row topmost'>
    <div className='col-2'><div className="w3-card w3-round ">
        <div className="w3-container">
         <h4 className="w3-center">My Profile</h4>
         <p className="w3-center"><img src={require("./avatartwo.png")} className="w3-circle" style={{"height" : "106px" , "width":"106px" }} alt="Avatar"></img></p>
         <hr></hr>
         <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
         <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
         <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
        </div>
      </div>
      <br></br></div>
    <div className='col-2 beige img' ><div className="w3-card w3-round ">
        <div className="w3-container">
         <h4 className="w3-center">My Profile</h4>
         <p className="w3-center"><img src={require("./dan.jpg")} className="w3-circle" style={{"height" : "106px" , "width":"106px", "transform":"rotate(90deg)" }} alt="Avatar"></img></p>
         <hr></hr>
         <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
         <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
         <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
        </div>
      </div>
      <br></br></div>
    <div className='col-2 pink'></div>
    <div className='col-2 black'></div>
    <div className='col-2 yellow'></div>
    <div className='col-2last lightblue'></div>
</div>


<div className='row top'>
     <div className='col-2 purple'></div>
     <div className='col-2 blue'></div>
     <div className='col-2 orange'></div>
     <div className='col-2 red'></div>
     <div className='col-2 grey'></div>
     <div className='col-2last lightgreen'></div>
 </div> */}




   
</>
)
}
}
export default HowItWorksPage;