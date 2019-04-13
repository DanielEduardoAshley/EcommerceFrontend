import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './address';
import PaymentForm from './paymentform';
import Review from './review';
import cartStorage from '../../services/cart';
import instance from '../../services/axios';
import AuthContext from '../../contexts/auth';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Shipping address', 'Payment details', 'Review your order'];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm state={5}/>;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };
static contextType = AuthContext
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }),()=>{
      if( this.state.activeStep === steps.length){
        console.log('order placed', this.props)
        instance.post(`users/${this.context.uid}`)
        .then((response)=>{
          const users_id= response.data.response[0].id
          const receipt = cartStorage.createGuestId()
          const buyerinfo = cartStorage.getCheckoutStorage()
          const name = `${buyerinfo[0]} ${buyerinfo[1]}`
          const paymentinfo = cartStorage.getPaymentStorage()
          const last = paymentinfo[3].split('')
          const last4 =last.slice(-4)
          const cc = parseInt(last4.join(''))
          const total = cartStorage.getLocalStorage()
          console.log('thistotal',cc)
          let totalamount = 0
          total.map(e=>{
            totalamount+= parseInt(e.price) || 0
            console.log(e.price)
          })
          console.log('total', totalamount)
          console.log(users_id, receipt, buyerinfo,name,paymentinfo,cc)
          // users_id, receipt, totalamount, name,address,city,state,zip,country,cc
          const address = buyerinfo[2]
          const city = buyerinfo[4]
          const state = buyerinfo[5]
          const zip = parseInt(buyerinfo[6])
          console.log("zip",typeof totalamount)
          const country = buyerinfo[7]
          const purchaseInfo =  {users_id, receipt,totalamount, name,address,city,state,zip,country,cc}

          instance.post('purchase', {users_id, receipt,totalamount, name,address,city,state,zip,country,cc})
         
        })
        console.log(this.context)
      }
    });
   
   console.log(this.props
    )

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
SHELF©️            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);