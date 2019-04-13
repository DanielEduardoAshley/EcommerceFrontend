import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import cartStorage from '../../services/cart'

class PaymentForm extends React.Component {
  state={
    cardName: '',
    cardNumber:'',
    expDate:'',
    cvv:'',
  }

  handleChange=(e ,name)=>{
    this.setState({
      [name] : e.target.value
    })
  }

  componentWillUnmount(){
    cartStorage.updatePaymentStorage(this.state)
    console.log(this.state)
  }

 render(){
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth onChange={e=>this.handleChange(e, 'cardName')}/>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" fullWidth onChange={e=>this.handleChange(e, 'cardNumber')}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth onChange={e=>this.handleChange(e, 'expDate')}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            onChange={e=>this.handleChange(e, 'cvv')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
}

export default PaymentForm;
