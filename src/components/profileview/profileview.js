import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

// import firebase from '../../firebase';
import * as firebase from 'firebase';
import {Link, HashRouter, Router} from 'react-router-dom'
import './profileview.css'
import instance from '../../services/axios'
import AuthContext from '../../contexts/auth'
import cartStorage from '../../services/cart';
import ReactPlayer from 'react-player'


class ProfileView extends Component {

  state={
    storymedia : [],
    user : null,
    token : null,
    userId : null,
    userData: [],
    activity:[],
    product:[],
    created: 0,
    
   
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
            console.log('this is the data',userData.data.response)
            this.setState({userData : userData.data.response})
            return userData
        })
        .then((response)=>{
          console.log('hhhey')
          return instance.get(`product/${response.data.response[0].id}/products`)
        })
        .then((response)=>{
          console.log(response)
          const data = response.data.response
          data.forEach(ele=>{
              if(ele.type === 'activity'){
                this.setState({activity : (this.state.activity || []).concat(ele) })
              }
              else if(ele.type === 'product'){
                this.setState({product : (this.state.product || []).concat(ele) })

              }

          })
          // this.setState({ product : (this.state.product || []).concat(response.data.response)})
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
    obj.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    obj.location = 'Anywhere'
    obj.price = 10000
    obj.name = 'Create An Product'
    obj.duration = '1 day'
    this.setState({
      product : (this.state.product || []).concat(obj)
    })
  }

handlechange=(e, i, type, detail)=>{
  // const { types } = this.state.type
  this.state[type][i][detail] = e.target.value;
  this.setState({
  [this.state[type]] : [this.state[type]],
  })
  //  console.log(activity, e)
}

handleNamechange=(e, i, type,name)=>{
  //  console.log(this.state.type)
console.log('type', this.state[type][i][name])
this.state[type][i][name] = e.target.value;
  this.setState({
  [this.state[type]] : [this.state[type]],
  })
  //  console.log(activity, e)
}


createProduct=(e, i, type)=>{
  const { description, duration, location, name, price, image } = this.state[type][i]
  const seller_id = this.state.userData[0].id
  
  const images = JSON.stringify(image)
  
  console.log('json', images)
  instance.post('product', {seller_id,description, duration,location, type, name, price, images })
  .then((response)=>{
    console.log('success', this.state[type])
    const types = this.state[type]
    types[i].id = response.data.response.id
    this.setState({
       [this.state[type]] : types
    },()=>{
      console.log(this.state[type])
    })
  })
}

update=(e,i,type)=>{
const { description, duration, location, name, price, image } = this.state[type][i]
console.log("update")
console.log(this.state[type][i])
const images = JSON.stringify(image)
const prodid = this.state[type][i].id
instance.put(`product/${prodid}`, { description, duration,location, type, name, price, images })
.then(()=>{
  console.log('success')
})

}



delete=(e, i, type)=>{

  console.log('remaining',  )
const prodid = this.state[type][i].id
console.log('id', prodid)
const newState = this.state[type]

instance.delete(`product/${prodid}`)
  .then(()=>{
    console.log('success')
    if(type === 'activity'){
    this.setState({
      activity : (newState.slice(0,i)).concat(newState.slice(i+1 )),
    })
  }
  else if(type === 'product'){
    this.setState({
      product : (newState.slice(0,i)).concat(newState.slice(i+1 )),
    })

  }
  })
  .then(()=>{
    console.log(this.state)
  })
  
}

  render() {

    console.log('This is your state',this.state)
    console.log(this.state.activity[0])
    const story = 'story'
    const placeholder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    const product = 'product'
    const activity = 'activity'
    const { description, duration, price, location, name } = this.state.activity
    return (<>


{/* <!-- Page Container --> */}
<div className="w3-container w3-content" style={{"maxWidth" : "1400px" ,  "marginTop" :" 20px"}}>    
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
      {this.state.storymedia.map((e,i)=>{
        return <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
        {/* <img src="/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img> */}
        <span className="w3-right w3-opacity">1 min</span>
        <h4 suppressContentEditableWarning={true} contentEditable='true'name='name' value={name}>Create Your Story</h4><button onClick={this.activity}>⛸️ Add An Activity</button><button onClick={this.product}>🎁Add A Product</button> 
        <hr className="w3-clear"></hr>
        {/* <ContentEditable className='actName' html={this.state.product[i].name} onChange={e=>this.handleNamechange(e,i,'storymedia', 'name')}  /><br></br><button onClick={e=>this.update(e,i, 'storymedia')}>Edit Story</button>  */}
        <h4 suppressContentEditableWarning={true} contentEditable='true'name='name' value={name}>'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'</h4>
        {/* Button to Add Media */}
        <div className='contains'>
        <div className="upload-btn-wrapper">
        <button className="btn">➕</button>
        <input type="file" name="myfile" onChange={e=>this.handleFileInput(e,story)} onClick={this.getFirebasetoken} />
        </div><div className='label'></div><div className='minus'>➖</div>
        </div>
        {/* Button to Add Media */}
       <a className='editText' onClick={e=>this.createProduct(e, i, 'product')}>🖊️</a>
       
       {/* <ContentEditable disabled={false} html={this.state.storymedia[i].description}  onChange={e=>this.handlechange(e, i, 'product','description')}/> */}
          <div className="w3-row-padding" style={{"margin" :"0 -16px"}}>
            <div className="w3-half">
      
            {this.state.storymedia.map((e,i)=>{
             return <img src={e} style={{"width" :"100%"}} alt="Northern Lights" className="w3-margin-bottom" key={i}></img>
            
            })
            }
             {/* { */}
          {/* //  (e.images || []).map((e,i)=>{  */}
          {/* //   return  <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
          //   })
          //   } */}
              </div>
            <div className="w3-half">
              <img src="/w3images/nature.jpg" style={{"width":"100%"}} alt="Nature" className="w3-margin-bottom"></img>
          </div>
        </div>
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div>
       })
       }  

      {this.state.activity.map((e,i)=>{
        console.log('iam', e.image)
        return <div className="w3-container w3-card w3-white w3-round w3-margin" key={i}><br></br>
        {/* <img src="/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{"width":"60px"}}></img> */}
        <span className="w3-right w3-opacity">16 min</span>
        <ContentEditable className='actName' html={this.state.activity[i].name} onChange={e=>this.handleNamechange(e,i, 'activity', 'name')}  /><br></br><button onClick={e=>this.delete(e,i, 'activity')}>➖ Delete Activity</button><button onClick={e=>this.update(e,i, 'activity')}>Edit Activity</button><button >Publish Activity</button> 
        <hr className="w3-clear"></hr>
        {/* Button to Add Media */}
        <div className='contains'>
        <div className="upload-btn-wrapper">
        <button className="btn">➕</button>
        <input type="file" name="myfile" onChange={e=>this.handleFileInput(e,activity, i)} onClick={this.getFirebasetoken} />
        </div><div className='label'></div><div className='minus'>➖</div>
        </div>
        {/* Button to Add Media */}
        <a className='editText' onClick={e=>this.createProduct(e, i, 'activity')}>🖊️</a>
        <div>Price:$<input placeholder='10000' value={e.price} onChange={e=>this.handlechange(e,i,'activity','price')}></input></div><br></br>
        <div>Location:<input placeholder='Anywhere'contentEditable='true' value={e.location} onChange={e=>this.handlechange(e, i, 'activity','location')}></input></div><br></br>
       <div>Duration:<input placeholder='1day' contentEditable='true'  value={e.duration} onChange={e=>this.handlechange(e, i, 'activity','duration')}></input></div>
        <ContentEditable disabled={false} html={this.state.activity[i].description}  onChange={e=>this.handlechange(e, i, 'activity','description')}/>
        {
          (e.image || []).map((e,i)=>{ 
            const media =  e.substring(
              e.lastIndexOf(".") + 1, 
              e.indexOf("?")
          );
            console.log(media)
            if(media === 'mp4' ){
              return <ReactPlayer url={e} playing key={i} />
            }
            else{
              console.log(e)

              return <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
            }   
              
            
             })
        }
        {
           (e.images || []).map((e,i)=>{ 
            const media =  e.substring(
              e.lastIndexOf(".") + 1, 
              e.indexOf("?")
          );
            console.log(media)
            if(media === 'mp4' ){
              return <ReactPlayer url={e} playing key={i} />
            }
            else{
              console.log(e)

              return <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
            }   
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
        <ContentEditable className='actName' html={this.state.product[i].name} onChange={e=>this.handleNamechange(e,i,'product', 'name')}  /><br></br><button onClick={e=>this.delete(e,i, 'product')}>➖ Delete Product</button><button onClick={e=>this.update(e,i, 'product')}>Edit Product</button><button >Publish Product</button> 
        <hr className="w3-clear"></hr>
        {/* Button to Add Media */}
        <div className='contains'>
        <div className="upload-btn-wrapper">
        <button className="btn">➕</button>
        <input type="file" name="myfile" onChange={e=>this.handleFileInput(e,product, i)} onClick={this.getFirebasetoken} />
        </div><div className='label'></div><div className='minus'>➖</div>
        </div>
        {/* Button to Add Media */}
        <a className='editText' onClick={e=>this.createProduct(e, i, 'product')}>🖊️</a>
        <div>Price:$<input placeholder='10000' value={e.price} onChange={e=>this.handlechange(e,i,'product','price')}></input></div><br></br>
        <div>Duration:<input placeholder='1day' contentEditable='true'  value={e.duration} onChange={e=>this.handlechange(e, i, 'product','duration')}></input></div>
        <ContentEditable disabled={false} html={this.state.product[i].description}  onChange={e=>this.handlechange(e, i, 'product','description')}/>
        {
          (e.image || []).map((e,i)=>{ 
            const media =  e.substring(
              e.lastIndexOf(".") + 1, 
              e.indexOf("?")
          );
            console.log(media)
            if(media === 'mp4' ){
              return <ReactPlayer url={e} playing key={i} />
            }
            else{
              console.log(e)

              return <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
            }   
  
  
          })
        }
        {
           (e.images || []).map((e,i)=>{ 
            const media =  e.substring(
              e.lastIndexOf(".") + 1, 
              e.indexOf("?")
          );
            console.log(media)
            if(media === 'mp4' ){
              return <ReactPlayer url={e} playing key={i} />
            }
            else{
              console.log(e)

              return <img src={e} style={{"width" :"100%"}}  className="w3-margin-bottom" key={i}></img> 
            }   
           })
        }
        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Comment</button> 
      </div> 

      })}
       



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