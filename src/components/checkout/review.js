import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import cartStorage from '../../services/cart'

const products = cartStorage.getLocalStorage('cart')
const addressess = cartStorage.getLocalStorage('checkout')
const paymentss = cartStorage.getPaymentStorage('payment')
const addresses = [addressess[2],addressess[4], addressess[5], addressess[6], addressess[7]];

console.log('this',paymentss)
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: `${paymentss[0]}` },
  { name: 'Card number', detail: `${paymentss[3]}` },
  { name: 'Expiry date', detail: `${paymentss[1]}`},
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  const { classes } = props;
  const state={
    address: ''
  }
  let total = 0
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product,i) => {
          if(product.price){
          total += parseInt(product.price)
          }
          else{
          total +=0
          }
         return <ListItem className={classes.listItem} key={product.name} key={i}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{`$${product.price || 0}`}</Typography>
          </ListItem>
        })}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
          {`$${total}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom></Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);