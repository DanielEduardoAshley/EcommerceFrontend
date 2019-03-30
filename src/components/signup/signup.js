import React from 'react';
import './signup.css';
import AuthContext from '../../contexts/auth'
import firebase from '../../firebase'

class Signup extends React.Component{
    state = {
        email: '',
        password: '',
        error: ''
      }
    
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.email)
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        console.log('hellosignup', )
        const { email, password } = this.state;
        console.log('check', email, password )

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((response) => {
            console.log('Returns: ', response);
          })
          .catch(err => {
            const { message } = err;
            this.setState({ error: message });
            console.log('somethingwrong')
          })
      }
    
    render(){

        
          const {email, password} = this.state
          const signup =  <>

          {
         <div className="signup">
        
     <form>
   <div className="form-row">
   <div className="form-group col-md-6">
     <label htmlFor="inputEmail4">Email</label>
     <input type="email" className="form-control" id="inputEmail4" placeholder="Email" onChange={this.handleChange} name={'email'} value={email}></input>
   </div>
   <div className="form-group col-md-6">
     <label htmlFor="inputPassword4">Password</label>
     <input type="password" className="form-control" id="inputPassword4" placeholder="Password" onChange={this.handleChange} name={'password'} value={password}></input>
   </div>
 </div>
 <div className="form-group">
   <label htmlFor="inputAddress">Address</label>
   <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
 </div>
 <div className="form-group">
   <label htmlFor="inputAddress2">Address 2</label>
   <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
 </div>
 <div className="form-row">
   <div className="form-group col-md-6">
     <label htmlFor="inputCity">City</label>
     <input type="text" className="form-control" id="inputCity"></input>
   </div>
   <div className="form-group col-md-4">
     <label htmlFor="inputState">State</label>
     <select id="inputState" className="form-control">
       <option defaultValue>Choose...</option>
       <option>California</option>
       <option>New York</option>
 
     </select>
   </div>
   <div className="form-group col-md-2">
     <label htmlFor="inputZip">Zip</label>
     <input type="text" className="form-control" id="inputZip"></input>
   </div>
 </div>
 <div className="form-group">
   <div className="form-check">
     <input className="form-check-input" type="checkbox" id="gridCheck"></input>
     <label className="form-check-label" htmlFor="gridCheck">
       Check me out
     </label>
   </div>
 </div>
 <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Sign in</button>
 </form>
         
     </div>
     }
           
           </>





         return(
        
 
    <AuthContext.Consumer>
        {
          (user) => {
            if (user) {
              return <div>User Created</div>
            } else {
              return signup;
            }
          }
        }
      </AuthContext.Consumer>  
  
         )


    }

}

export default Signup;