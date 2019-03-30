import React, { Component } from 'react';
import './productlistingsview.css'
import { Button } from 'reactstrap';
import Productlistingscard from '../productlistingscard/productlistingscard'
import Sidedashboard from '../sidedashboard/sidedashboard'

class ProductListingsView extends React.Component{


    state={
        profiles: ['Daniel','Peter', 'James','Daniel','Peter', 'James','Daniel','Peter', 'James','Daniel','Peter', 'James',]

    }

    render(){
        return(
        <>
<div className='toprow'>
    <div className="rowone">
  {  this.state.profiles.map((e,i)=>{
    return    <Productlistingscard name={e}/>

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