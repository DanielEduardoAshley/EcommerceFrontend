import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

// import firebase from '../../firebase';
import * as firebase from 'firebase';
import {Link, HashRouter, Router} from 'react-router-dom'
import './profileview.css'
import instance from '../../services/axios'
import AuthContext from '../../contexts/auth'


class ProfileView extends Component {

  state={
    storymedia : [],
    user : null,
    token : null,
    userId : null,
    userData: [],
    activity:[],
    product:[],
    
   
  }

  saveImage = (url, type, i=null) => {
    const date = Date();
    if(type === 'story'){
      this.setState({
        storymedia : (this.state.storymedia || []).concat(url)
      })
    }
    else if(type === 'activity'){
      const {activity} = this.state
      const images =  (activity[i].image || []).concat(url)
      activity[i].image = images
      this.setState({
      activity : activity ,
      })
    }
    else{
      const {product} = this.state
      const images =  (product[i].image || []).concat(url)
      product[i].image = images
      this.setState({
      product : product,
    })

  }
    // ImageService.saveImage(url, date);
  }

  handleFileInput = async (e,type, i) => {
   

    const firstFile = e.target.files[0];

    const root = firebase.storage().ref()
    const newImage = root.child(firstFile.name);

    // newImage.put(firstFile)
    //   .then((snapshot) => {
    //     return snapshot.ref.getDownloadURL()
    //   })
    //   .then((url) => {
    //     console.log(url)
    //     this.saveImage(url);
    //   })

    try {
      const snapshot = await newImage.put(firstFile);
      const url = await snapshot.ref.getDownloadURL();
      this.saveImage(url,type, i);
    }
    catch(err) {
      console.log(err);
    }
    
  }

  load=(e, user)=>{
    console.log("hello")
      this.setState({ 
        user : user
      
      })


  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ..... DO YOUR LOGGED IN LOGIC
        this.setState({  userId: user.uid }, () => {
          this.getFirebasetoken()

        })


        instance.post(`users/${user.uid}`)
        .then((userData)=>{
            console.log('this is the data',userData.data.response[0])
            this.setState({userData : userData.data.response})
        })
      
      }
 })
}

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  
  
  
  
  getFirebasetoken=()=>{
    firebase.auth().currentUser.getIdToken(false)
    .then((token)=>{
      this.setState({
        token : token
      })
      console.log(token)
    })
  }

  activity=()=>{
     const obj = {}
     obj.image = []
     obj.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
     obj.location = 'Anywhere'
     obj.price = 10000
     obj.name = 'Create An Activity'
     obj.duration = '1 day'
     this.setState({
       activity : (this.state.activity || []).concat(obj)
     })
  }

  product=()=>{
    const obj = {}
    obj.image = []
     this.setState({
       product : (this.state.product || []).concat(obj)
     })
  }

handlechange=(e, i, name)=>{
  const { activity } = this.state
  activity[i][name] = e.target.value;
  this.setState({
  activity : activity,
  })
   console.log(activity, e)
}


  render() {
    console.log(this.state.activity[0])
    const story = 'story'
    const placeholder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    const product = 'product'
    const activity = 'activity'
    const { description, duration, price, location, name } = this.state.activity
    return (<>

 

{/* <!-- Navbar --> */}
{/* <div className="">
 <div className="">
  <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onClick={this.myFunction}><i className="fa fa-bars"></i></a>
  <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right"></i>Logo</a>
  <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></a>
  <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user"></i></a>
  <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
  <div className="w3-dropdown-hover w3-hide-small">
    <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span></button>     
    <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{"width" : "300px"}}>
      <a href="#" className="w3-bar-item w3-button">One new friend request</a>
      <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
      <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
    </div>
  </div>
  <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
    <img src={require("./dan.jpg")}  className="w3-circle" style={{"height" : "23px" , "width" : "23px", "transform" : "rotate(90deg)"}} alt="Avatar"></img>
  </a>
 </div>
</div> */}

{/* <!-- Navbar on small screens --> */}
{/* <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
  <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
  <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
  <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
  <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
</div> */}

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
            return <h4 key={i} className="w3-center">{`${e.name}'s Profile`}</h4>

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
        {/* <img src="/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img> */}
        <span className="w3-right w3-opacity">1 min</span>
        <h4 suppressContentEditableWarning={true} contentEditable='true'name='name' value={name}>Create Your Story</h4><button onClick={this.activity}>⛸️ Add An Activity</button><button onClick={this.product}>🎁Add An Product</button> 
        <hr className="w3-clear"></hr>

        {/* Button to Add Media */}
        <div className='contains'>
        <div className="upload-btn-wrapper">
        <button className="btn">➕</button>
        <input type="file" name="myfile" onChange={e=>this.handleFileInput(e,story)} onClick={this.getFirebasetoken} />
        </div><div className='label'></div><div className='minus'>➖</div>
        </div>
        {/* Button to Add Media */}
       <a className='editText'>🖊️</a>
       
        <p suppressContentEditableWarning={true} contentEditable='true' onClick={this.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="w3-row-padding" style={{"margin" :"0 -16px"}}>
            <div className="w3-half">
            {this.state.storymedia.map((e,i)=>{
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
        return <div className="w3-container w3-card w3-white w3-round w3-margin" key={i}><br></br>
        {/* <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img> */}
        <span className="w3-right w3-opacity">16 min</span>
        <ContentEditable className='actName' html={this.state.activity[i].name} onChange={e=>this.handlechange(e,i, 'name')}  /><br></br><button>➖ Delete Activity</button><button>Edit Activity</button><button >Publish Activity</button> 
        <hr className="w3-clear"></hr>
        {/* Button to Add Media */}
        <div className='contains'>
        <div className="upload-btn-wrapper">
        <button className="btn">➕</button>
        <input type="file" name="myfile" onChange={e=>this.handleFileInput(e,activity, i)} onClick={this.getFirebasetoken} />
        </div><div className='label'></div><div className='minus'>➖</div>
        </div>
        {/* Button to Add Media */}
        <a className='editText'>🖊️</a>
        <div>Price:$<input placeholder='10000' value={price} onChange={e=>this.handlechange(e,i,'price')}></input></div><br></br>
        <div>Location:<input placeholder='Anywhere'contentEditable='true' value={location} onChange={e=>this.handlechange(e, i, 'location')}></input></div><br></br>
       <div>Duration:<input placeholder='1day' contentEditable='true'  value={duration} onChange={e=>this.handlechange(e, i, 'duration')}></input></div>
        <ContentEditable disabled={false} html={this.state.activity[i].description}  onChange={e=>this.handlechange(e, i, 'description')}/>
        {(e.image || []).map((e,i)=>{ 
            return   <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
            
            
             })
        }
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div> 

      })}

      {/* {     this.state.activitymedia[0].map((e,i)=>{
             return <img src={e} style={{"width" :"100%"}} alt="Northern Lights" className="w3-margin-bottom" key={i}></img>
            
            })
            } */}

      {this.state.product.map((e,i)=>{
        return <div className="w3-container w3-card w3-white w3-round w3-margin" key={i}><br></br>
        {/* <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img> */}
        <span className="w3-right w3-opacity">16 min</span>
        <h4 suppressContentEditableWarning={true} contentEditable='true'>Create A Product</h4><br></br><button>➖ Delete Product</button><button>Edit Product</button><button>Publish Product</button> 
        <hr className="w3-clear"></hr>
        {/* Button to Add Media */}
        <div className='contains'>
        <div className="upload-btn-wrapper">
        <button className="btn">➕</button>
        <input type="file" name="myfile" onChange={e=>this.handleFileInput(e,product, i)} onClick={this.getFirebasetoken} />
        </div><div className='label'></div><div className='minus'>➖</div>
        </div>
        {/* Button to Add Media */}
        <a className='editText'>🖊️</a>
        <div>Price:<a suppressContentEditableWarning={true} contentEditable='true'>$</a></div><br></br>
       <div>Duration:<a suppressContentEditableWarning={true} contentEditable='true' onChange={e=>this.duration(e)}>1 day</a></div>
        <p suppressContentEditableWarning={true} contentEditable='true'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        {
          (e.image || []).map((e,i)=>{ 
          return   <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
  
  
          })
        }
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div> 

      })}
       

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
export default ProfileView;