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
        console.log(this.props)
        return(
        <>
<div className='toprow'>
    <div className="rowone">
  {  this.props.searchresults.map((e,i)=>{
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

export default ProductListingsView