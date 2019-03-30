import React, { Component } from 'react';
import './splashpage.css'
import { Button } from 'reactstrap';


class SplashPage extends React.Component{

render(){
return(<>
<div className='live'> 
    Live a day in the life of a  
    <span className='identity'> 
    Artist<br/> 
    Model<br/>
    Actor <br/>
    Adventurer<br/>
    Traveller 
    </span>
  </div>

<Button outline color="primary buttonlocation">How It Works</Button>{' '}

</>
)
}


}

export default SplashPage