import React, { Component } from 'react';
// import firebase from '../../firebase';
import * as firebase from 'firebase';
import {Link, HashRouter, Router} from 'react-router-dom'
import './searchview.css'
import instance from '../../services/axios'
import AuthContext from '../../contexts/auth'
import cartStorage from '../../services/cart'


class SearchView extends Component {

  state={
    media : [],
    user : null,
    token : null,
    userId : null,
    userData: [],
    activity:[],
    product: [],
  }


  saveImage = (url) => {
    const date = Date();
    this.setState({
      media : (this.state.media || []).concat(url)
    })
    // ImageService.saveImage(url, date);
  }

 
  load=(e, user)=>{
    console.log("hello")
      this.setState({ 
        user : user
      
      })


  }

  componentDidMount() {
    const id = this.props.history.location.pathname.split('/')
    // console.log(id[id.length-1])
    const userid = id[id.length-1]
    instance.get(`users/${userid}/user`)
    .then((response)=>{
      this.setState({
        userData : (this.state.userData || []).concat(response.data.response)
      })
      return response
    })
    .then(response=>{
      console.log('heer', response)
     return instance.get(`product/${response.data.response[0].id}/products`)
    })
    .then((response)=>{
      console.log(response)
      response.data.response.map((e,i)=>{
         if(e.type ==='activity'){
              this.setState({
                activity : (this.state.activity || []).concat(e)
              })
        }
        else if(e.type ==='product'){
          this.setState({
            product : (this.state.product || []).concat(e)
          })
        }
      })
      

      })
      .then(()=>{
        console.log(this.state)
      })
    
}

  componentWillUnmount() {
  }
  
  addToCart=(e,elem)=>{
       
    cartStorage.updateStorage([elem])
  
 }
  
 


  render() {
    console.log('popsy',this.props)

    return (<>

 



{/* <!-- Page Container --> */}
<div className="w3-container w3-content" style={{"maxWidth" : "1400px" ,  "marginTop" :" 80px"}}>    
  {/* <!-- The Grid --> */}
  <div className="w3-row">
    {/* <!-- Left Column --> */}
    <div className="w3-col m3">
      {/* <!-- Profile --> */}
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          {this.state.userData.map((e,i)=>{
            return <h4 key={i} className="w3-center">{`${e.name }'s Profile ${e.age }` }</h4>

          })}
         <p className="w3-center"><img src={require("./dan.jpg")} className="w3-circle" style={{"height" : "106px" , "width":"106px" , "transform":"rotate(90deg)"}} alt="Avatar"></img></p>
         <hr></hr>
         <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
         <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
         <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
        </div>
      </div>
      <br></br>
      
      {/* <!-- Accordion --> */}
      <div className="w3-card w3-round">
        <div className="w3-white">
          <button  className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups</button>
          <div id="Demo1" className="w3-hide w3-container">
            <p>Some text..</p>
          </div>
          <button  className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events</button>
          <div id="Demo2" className="w3-hide w3-container">
            <p>Some other text..</p>
          </div>
          <button className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-users fa-fw w3-margin-right"></i> My Photos</button>
          <div id="Demo3" className="w3-hide w3-container">
         <div className="w3-row-padding">
         <br></br>
           <div className="w3-half">
             <img src={require("./dan.jpg")} style={{"width" :"100%"}} className="w3-margin-bottom"></img>
           </div>
           <div className="w3-half">
             <img src="/w3images/nature.jpg" style={{"width":"100%"}} className="w3-margin-bottom"></img>
           </div>
           <div className="w3-half">
             <img src="/w3images/mountains.jpg" style={{"width" :"100%"}} className="w3-margin-bottom"></img>
           </div>
           <div className="w3-half">
             <img src="/w3images/forest.jpg" style={{"width" :"100%"}} className="w3-margin-bottom"></img>
           </div>
           <div className="w3-half">
             <img src="/w3images/nature.jpg" style={{"width" :"100%"}} className="w3-margin-bottom"></img>
           </div>
           <div className="w3-half">
             <img src={require("./dan.jpg")} style={{"width" :"100%"}} className="w3-margin-bottom"></img>
           </div>
         </div>
          </div>
        </div>      
      </div>
      <br></br>
      
      {/* <!-- Interests -->  */}
      <div className="w3-card w3-round w3-white w3-hide-small">
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
      <br></br>
      
      {/* <!-- Alert Box --> */}
      <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
        <span onClick={this.myFunction} className="w3-button w3-theme-l3 w3-display-topright">
          <i className="fa fa-remove"></i>
        </span>
        <p><strong>Hey!</strong></p>
        <p>People are looking at your profile. Find out who.</p>
      </div>
    
    {/* <!-- End Left Column --> */}
    </div>
    
    {/* <!-- Middle Column --> */}
    <div className="w3-col m7">
    
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity"></h6>
              <p  className="w3-border w3-padding">Status: Feeling Blue</p>
              <button type="button" className="w3-button w3-theme"><i className="fa fa-pencil"></i>  Post</button> 
            </div>
          </div>
        </div>
      </div>
      
      <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
        <img src="/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img>
        <span className="w3-right w3-opacity">1 min</span>
        <h4>John Doe </h4><br></br>
        <hr className="w3-clear"></hr>

       

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="w3-row-padding" style={{"margin" :"0 -16px"}}>
            <div className="w3-half">
            {this.state.media.map((e,i)=>{
             return <img src={e} style={{"width" :"100%"}} alt="Northern Lights" className="w3-margin-bottom" key={i}></img>
            
            })
            }
              </div>
            <div className="w3-half">
              <img src="/w3images/nature.jpg" style={{"width":"100%"}} alt="Nature" className="w3-margin-bottom"></img>
          </div>
        </div>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div>
      {this.state.activity.map((e,i)=>{
       return (<div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
        <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img>
        <span className="w3-right w3-opacity">16 min</span>
        <h4>{e.name}</h4><Link to={`/product/${e.id}`} className='prodview'>🔎</Link><a onClick={event=>this.addToCart(event,e)}>🛒</a><br></br>
        <hr className="w3-clear"></hr>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
        
       </div>  )
      })
      }



      {this.state.product.map((e,i)=>{
       return (<div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
        <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img>
        <span className="w3-right w3-opacity">16 min</span>
        <h4>{e.name}</h4><Link to={`/product/${e.id}`} className='prodview'>🔎</Link><a onClick={event=>this.addToCart(event,e)}>🛒</a><br></br>
        <hr className="w3-clear"></hr>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
        
       </div>  )
      })
      }
      {/* <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
        <img src="/w3images/avatar6.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img>
        <span className="w3-right w3-opacity">32 min</span>
        <h4>Angie Jane</h4><br></br>
        <hr className="w3-clear"></hr>
        <p>Have you seen this?</p>
        <img src="/w3images/nature.jpg" style={{"width":"100%"}} className="w3-margin-bottom"></img>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div>  */}

      
      
    {/* <!-- End Middle Column --> */}
    </div>
    
    {/* <!-- Right Column --> */}
    <div className="w3-col m2">
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <p>Upcoming Events:</p>
          <img src="/w3images/forest.jpg" alt="Forest" style={{"width":"100%"}}></img>
          <p><strong>Holiday</strong></p>
          <p>Friday 15:00</p>
          <p><button className="w3-button w3-block w3-theme-l4">Info</button></p>
        </div>
      </div>
      <br></br>
      
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <p>Friend Request</p>
          <img src="/w3images/avatar6.png" alt="Avatar" style={{"width":"50%"}}></img><br></br>
          <span>Jane Doe</span>
          <div className="w3-row w3-opacity">
            <div className="w3-half">
              <button className="w3-button w3-block w3-green w3-section" title="Accept"><i className="fa fa-check"></i></button>
            </div>
            <div className="w3-half">
              <button className="w3-button w3-block w3-red w3-section" title="Decline"><i className="fa fa-remove"></i></button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      
      <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
        <p>ADS</p>
      </div>
      <br></br>
      
      <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
        <p><i className="fa fa-bug w3-xxlarge"></i></p>
      </div>
      
    {/* <!-- End Right Column --> */}
    </div>
    
  {/* <!-- End Grid --> */}
  </div>
  
{/* <!-- End Page Container --> */}
</div>
<br></br>

{/* <!-- Footer --> */}
<footer className="w3-container w3-theme-d3 w3-padding-16">
  <h5>Footer</h5>
</footer>

<footer className="w3-container w3-theme-d5">
  <p>Powered by <a href="" target="_blank">Daniel</a></p>
</footer>
 








      </>)

}
}
export default SearchView;