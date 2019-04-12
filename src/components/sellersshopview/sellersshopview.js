import React, { Component } from 'react';
import './sellersshopview.css';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import instance from '../../services/axios';
import AuthContext from '../../contexts/auth';
import * as firebase from 'firebase';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });
  
 


class TextFields extends React.Component{
    state = {
        // name: 'Beautiful',
        // email: '',
        // address:
        // age: '',
        // multiline: '345 Wilbury Rd',
        // currency: 'EUR',
        userData: [],
      };
      componentDidMount(){
      this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        instance.post(`users/${user.uid}`)
        .then((userData)=>{
            console.log('this is the data',userData.data.response)
            this.setState({userData : (this.state.userData || []).concat(userData.data.response)})
        })
      }

    })
      }

      componentWillUnmount(){
        this.unsubscribe()
      }
      handleChange = name => event => {
        console.log(event.target.value)
         this.state.userData[0][name] = event.target.value
        this.setState({ [this.state.userData]: [this.state.userData] });
      };
    
      update=()=>{
        const {username,name , email, address, number, country, state, zip,cc,age,type,description, shopname, id} = this.state.userData[0]
        console.log("update")
        instance.put(`users/${id}`, {username, name , email, address, number, country, state, zip, cc,age,type,description, shopname, id})
        .then(()=>{
          console.log('success', this.state.userData[0])

        })
        console.log('props', this.props)
    }

render(){
    
    const { classes } = this.props
    return(
            <>
          {this.state.userData[0] ?<>
     <div className="textfield">
     <div className="textrow">
     <div className="sellerproduct">
           <div className="w3-card w3-round w3-white sellerrow">
        <div className="w3-container">
         <h4 className="w3-center">My Profile</h4>
         <p className="w3-center"><img src={require("./galaxy.jpg")} className="w3-circle" style={{"height" : "106px" , "width":"106px" , "transform":"rotate(90deg)"}} alt="Avatar"></img></p>
         <hr></hr>
         <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
         <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
         <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1993</p>
        </div>
        </div>
        </div>
        </div>

       <div className="formrow">
       <form className={classes.container} noValidate autoComplete="off">
       {/* username,name, email, address, number, country, state, age, type, description, shopname, */}
        <TextField
          id="standard-name"
          label="Name"
          defaultValue={`${this.state.userData[0].name}` || ''}
          className={classes.textField}
          // value={this.state.userData[0].name}
          onChange={this.handleChange('name')}
          margin="normal"
        />

        <TextField
          id="standard-uncontrolled"
          label="Username"
          defaultValue={this.state.userData[0].username}
          className={classes.textField}
          onChange={this.handleChange('username')}

          margin="normal"
        />

        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-read-only-input"
          label="Shop Name(optional)"
          defaultValue={this.state.userData[0].shopname}
          className={classes.textField}
          onChange={this.handleChange('shopname')}
          margin="normal"
        />

        <TextField
          disabled
          id="standard-disabled"
          label="Account Type"
          defaultValue="Profile"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-password-input"
          label="Credit Card"
          defaultValue={this.state.userData[0].cc}
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          onChange={this.handleChange('cc')}
          margin="normal"
        />

        <TextField
          id="standard-read-only-input"
          label="Age"
          defaultValue={this.state.userData[0].age}
          className={classes.textField}
          onChange={this.handleChange('age')}
          margin="normal"
         
        />

        <TextField
          id="standard-dense"
          label="Tagline"
          defaultValue="The muthafukn GOAT!"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
        />

        <TextField
          id="standard-multiline-flexible"
          label="Address"
          multiline
          rowsMax="4"
          defaultValue={this.state.userData[0].address}
          onChange={this.handleChange('address')}
          className={classes.textField}
          margin="normal"
        />

        {/* // <TextField */}
        {/* //   id="standard-multiline-static"
        //   label="Description"
        //   multiline
        //   rows="4"
        //   defaultValue="Default Value"
        //   className={classes.textField}
        //   margin="normal"
        // /> */}

        {/* <TextField
          id="standard-helperText"
          label="Number"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        /> */}

        <TextField
          id="standard-read-only-input"
          label="Country"
          defaultValue={this.state.userData[0].country}
          placeholder="Placeholder"
          className={classes.textField}
          onChange={this.handleChange('country')}
          margin="normal"
        />

        {/* <TextField
          id="standard-textarea"
          label="With placeholder multiline"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
        /> */}

        <TextField
           id="standard-read-only-input"
          label="Number"
          defaultValue={this.state.userData[0].number}
          placeholder="Placeholder"
          className={classes.textField}
          onChange={this.handleChange('number')}
          margin="normal"
        />

        {/* <TextField
          id="standard-search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
        /> */}

        {/* <TextField
          id="standard-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        > */}
          {/* {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
        {/* <TextField
          id="standard-select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        > */}
          {/* {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} */}
        {/* </TextField> */}
        <TextField
          id="standard-width"
          label="Description"
          style={{ margin: 8 }}
          defaultValue={this.state.userData[0].description}
          placeholder="Placeholder"
        //   helperText="Full width!"
          fullWidth
          onChange={this.handleChange('description')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="standard-width"
          label="Birthday"
          className={classes.textField}
          defaultValue="02/15/1993"
          margin="normal"
        />
      </form>
      <div className='edituserrow' onClick={e=>this.update()}>🖊️</div>

      </div>
      </div>
      <button className="historyButton">Show Purchase History</button>
      </>
      : null
        }
      
      </>
      
    )}
      
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(TextFields);
        