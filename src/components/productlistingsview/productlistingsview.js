import React, { Component } from 'react';
import './productlistingsview.css'
import { Button } from 'reactstrap';
import Productlistingscard from '../productlistingscard/productlistingscard'
import Sidedashboard from '../sidedashboard/sidedashboard'


class ProductListingsView extends React.Component{


    state={
        profiles: ['Daniel','Peter', 'James','Daniel','Peter', 'James','Daniel','Peter', 'James','Daniel','Peter', 'James',],
        activities: [],
        product:[],
        searchby: '',

    }
   

    render(){
        const searchby =(this.props.searchresults.searchby || '').toLowerCase()
        const productresults = this.props.searchresults[searchby]
        console.log('searchby', searchby)
        console.log('k',this.props.searchresults[searchby])
        if(searchby === 'activity'){
        return(
        <>
    
<div className='toprow'>
    <div className="rowone">
  {  productresults.map((e,i)=>{
    return    <Productlistingscard key={i} name={e.name}  />

      })  
  }
    </div>
    <div className="rowtwo">
    <Sidedashboard/>
    
    </div>
</div>
        </>
        )}
        else if(searchby === 'product'){
            return(
                <>
            
        <div className='toprow'>
            <div className="rowone">
          {  productresults.map((e,i)=>{
            return    <Productlistingscard key={i} name={e.name}  />
        
              })  
          }
            </div>
            <div className="rowtwo">
            <Sidedashboard/>
            
            </div>
        </div>
                </>
                )
        }
        else {
            return(
                <>
            
        <div className='toprow'>
            <div className="rowone">
          {  this.props.searchresults.profile.map((e,i)=>{
            return    <Productlistingscard key={i} name={e.name}  />
        
              })  
          }
            </div>
            <div className="rowtwo">
            <Sidedashboard/>
            
            </div>
        </div>
                </>
                )

        }
        
    }
        
}

export default ProductListingsView