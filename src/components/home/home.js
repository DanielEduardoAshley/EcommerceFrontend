import React, { Component } from 'react';
// import firebase from '../../firebase';
import * as firebase from 'firebase';
import {Link, HashRouter, Router} from 'react-router-dom'
import instance from '../../services/axios'
import AuthContext from '../../contexts/auth'
import './home.css'
import cartStorage from '../../services/cart'


class Home extends Component {
  state={
      featuredprofiles: [],
      featuredproducts: [],
      featuredactivities: [],
      audio:  new Audio('https://s1.vocaroo.com/media/download_temp/Vocaroo_s1BfzJCLDCQ3.mp3'),
  }

  componentDidMount(){

    this.state.audio.play();
   const featuredprofiles = instance.get('users/home/profiles')
   const featuredproducts = instance.get('product/homeproducts')
   const featuredactivities = instance.get('product/homeactivities')

   featuredprofiles.then((response)=>{
    this.setState({
           featuredprofiles : (this.state.featuredprofiles || []).concat(response.data.response)
       })
   })
   .then(()=>{
       console.log('successprofile')
   })
   .catch((error)=>{
        console.log('something went wrong profiles', error)
   })

   
   featuredproducts.then((response)=>{
    this.setState({
        featuredproducts: (this.state.featuredproducts || []).concat(response.data.response)
    })
    })
    .then(()=>{
        console.log('successproducts')
    })
    .catch((error)=>{
        console.log('something went wrong products', error)
    })

   
    featuredactivities.then((response)=>{
     this.setState({
        featuredactivities: (this.state.featuredactivities || []).concat(response.data.response)
    })
    })
    .then(()=>{
        console.log('successactivities')
    })
    .catch((error)=>{
        console.log('something went wrong activities', error)
    })
  }

  componentWillUnmount(){
      this.state.audio.pause()
  }

  addToCart=(e,elem)=>{
      
    if(elem.type === 'profile'){
      instance.get(`product/${elem.id}/products`)
        .then((response)=>{
          console.log('j',response.data.response)
          cartStorage.updateStorage(response.data.response)
        })
    }
    else{
      
      cartStorage.updateStorage([elem])
    }
   }
    


  render(){
    

      console.log(this.state)
    return(
        <>
        <h4 className='heading'>Featured Profiles</h4>
        <div className='homecontainer'>
            
                {this.state.featuredprofiles.map((e,i)=>{
                    if(i < 8){
                        return  <> 
                        <div className=" homerows " >
                        <div className="card" style={{"width" : "18rem"}}>
                        <HashRouter><><Link to={`/searchview/${e.id}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>
                        <div onClick={event=>this.addToCart(event,e)}>🛒</div>
                        <p className="card-text">{e.name}</p>
                        <img src={'https://scontent-lga3-1.cdninstagram.com/vp/3e8278613043ff594db998fcec1a5d7f/5D363E0D/t51.2885-15/e35/41158169_668065223593538_7268630046966900801_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com' || require('./Crab_Nebula')} className="card-img-top" ></img>
                        <div className="card-body">{e.description}</div>
                        </div>
                        
                        
                        </div>
                        
                      </>
                        
                    }
                    
                
                   
                    
                })}
            </div>

        
        <h4 className='heading'>Featured Products</h4>
         <div className='homecontainer'>
         {this.state.featuredproducts.map((e,i)=>{
                    if(i < 8){
                        return  <> 
                        <div className=" homerows " >
                        <div className="card" style={{"width" : "18rem"}}>
                        <HashRouter><><Link to={`/product/${e.id}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>
                        <div onClick={event=>this.addToCart(event,e)}>🛒</div>
                        <p className="card-text">{e.name}</p>
                        <img src={'https://scontent-lga3-1.cdninstagram.com/vp/18725275db0b1bd0399401381428e905/5D4A2196/t51.2885-15/e35/19436214_318838905239074_1222867550988140544_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com'} className="card-img-top" ></img>
                        {/* <div className="card-body">{e.description}</div> */}
                        </div>
                        
                        
                        </div>
                        
                      </>
                        
                    }
                })}
                </div>   


        <h4 className='heading'>Featured Activities</h4>
         <div className='homecontainer'>
             {this.state.featuredactivities.map((e,i)=>{
                    if(i < 8){
                        return  <> 
                        <div className=" homerows " >
                        <div className="card" style={{"width" : "18rem"}}>
                        <HashRouter><><Link to={`/product/${e.id}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>
                        <div onClick={event=>this.addToCart(event,e)}>🛒</div>
                        <p className="card-text">{e.name}</p>
                        <img src={'https://scontent-lga3-1.cdninstagram.com/vp/5357daec1a1a22f816855055f33ed536/5D401F9E/t51.2885-15/e35/44718693_338834966674427_3353805289647361821_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com' || require('./Crab_Nebula.jpg')} className="card-img-top" ></img>
                        {/* <div className="card-body">{e.description}</div> */}
                        
                        </div>
                        
                        
                        </div>
                        
                      </>
                        
                    }
                    
                })}
        </div>
        </>
    )
}

}

export default Home