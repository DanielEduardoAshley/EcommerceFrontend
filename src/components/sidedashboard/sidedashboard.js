import React from 'react';


class Sidedashboard extends React.Component{

render(){
    return(
<>
<div className="w3-card w3-round w3-white">
        <div className="w3-container">
         <h4 className="w3-center">My Profile</h4>
         <p className="w3-center"><img src={require("./galaxy.jpg")} className="w3-circle" style={{"height" : "106px" , "width":"106px" , "transform":"rotate(90deg)"}} alt="Avatar"></img></p>
         <hr></hr>
         <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
         <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
         <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1993</p>
        </div>
      </div>
      <br></br>

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
</>

    )
}

}


export default Sidedashboard