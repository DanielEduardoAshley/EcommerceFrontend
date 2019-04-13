import React from 'react';
import firebase from '../../firebase';
import cartStorage from '../../services/cart'

class Logout extends React.Component {

  componentDidMount() {
    firebase.auth().signOut()
    cartStorage.rid()
  }

  render() {
    return <h1>Logging out...</h1>
  }
}

export default Logout