import React, { Component } from 'react';
import './sellersshopview.css'
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
  
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];


class TextFields extends React.Component{
    state = {
        name: 'Beautiful',
        age: '',
        multiline: '345 Wilbury Rd',
        currency: 'EUR',
      };

      handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };
    

render(){
    const { classes } = this.props
    return(
            <>
          
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
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />

        <TextField
          id="standard-uncontrolled"
          label="Username"
          defaultValue="Daniel"
          className={classes.textField}
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
          defaultValue="Macy's"
          className={classes.textField}
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
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

        <TextField
          id="standard-read-only-input"
          label="Age"
          defaultValue="26"
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
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
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
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
          placeholder="Placeholder"
          className={classes.textField}
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
          id="standard-number"
          label="Number"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
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
          placeholder="Placeholder"
        //   helperText="Full width!"
          fullWidth
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
      <div className='edituserrow'>🖊️</div>

      </div>
      </div>
      <button className="historyButton">Show Purchase History</button>

      
      </>
      
    )}
      
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(TextFields);
        