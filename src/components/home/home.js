import React, { Component } from 'react';
// import firebase from '../../firebase';
import * as firebase from 'firebase';
import {Link, HashRouter, Router} from 'react-router-dom'
import instance from '../../services/axios'
import AuthContext from '../../contexts/auth'
import './home.css'


class Home extends Component {
  state={
      featuredprofiles: [],
      featuredproducts: [],
      featuredactivities: [],
  }
  componentDidMount(){

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

  render(){
      console.log(this.state)
    return(
        <>
        <h4 className='heading'>Featured Profiles</h4>
        <div className='homecontainer'>
            
                {this.state.featuredprofiles.map((e,i)=>{
                    if(i < 4){
                        return  <> 
                        <div className=" homerows " >
                        <div className="card" style={{"width" : "18rem"}}>
                        <HashRouter><><Link to={`/searchview/${1}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>
                        <div onClick={this.addToCart}>🛒</div>
                        <p className="card-text">{e.name}</p>
                        <img src={require('./Crab_Nebula.jpg')} className="card-img-top" ></img>
                        <div className="card-body">{e.description}</div>
                        </div>
                        
                        
                        </div>
                        
                      </>
                        
                    }
                    
                
                   
                    
                })}
            </div>

        

         <div className='homecontainer'>
         {this.state.featuredproducts.map((e,i)=>{
                    if(i < 4){
                        return  <> 
                        <div className=" homerows " >
                        <div className="card" style={{"width" : "18rem"}}>
                        <HashRouter><><Link to={`/searchview/${1}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>
                        <div onClick={this.addToCart}>🛒</div>
                        <p className="card-text">{e.name}</p>
                        <img src={require('./Crab_Nebula.jpg')} className="card-img-top" ></img>
                        {/* <div className="card-body">{e.description}</div> */}
                        </div>
                        
                        
                        </div>
                        
                      </>
                        
                    }
                })}
                </div>   



         <div className='homecontainer'>
             {this.state.featuredactivities.map((e,i)=>{
                    if(i < 4){
                        return  <> 
                        <div className=" homerows " >
                        <div className="card" style={{"width" : "18rem"}}>
                        <HashRouter><><Link to={`/searchview/${1}` }  ><img src={require('./dan.jpg')} alt="Avatar" className="w3-left w3-circle w3-margin-right avatar" style={{"width":"60px", "marginLeft": "50px", "marginTop": "15px"}} ></img></Link></></HashRouter>
                        <div onClick={this.addToCart}>🛒</div>
                        <p className="card-text">{e.name}</p>
                        <img src={require('./Crab_Nebula.jpg')} className="card-img-top" ></img>
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