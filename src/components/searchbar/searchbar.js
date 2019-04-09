import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './searchbar.css'
import instance from '../../services/axios'
import ProductlistingsView from '../productlistingsview/productlistingsview'
import { HashRouter, Redirect, Link } from 'react-router-dom'
import {withRouter} from 'react-router'
const options = [
  'Search By',
  'Profile',
  'Product',
  'Activity',
 
];

const ITEM_HEIGHT = 48;

class Searchbar extends React.Component {
  state = {
    anchorEl: null,
    searchby: '',
    profile: [],
    product:[],
    activity:[],
    query: '',

  };

searchby =()=>{
   const {searchby} =  this.state 
   console.log('query',this.state.query)
   if(this.state.query !== ''){
   this.props.history.push(`/search/${this.state.query}`)
   }
   console.log('helloworld')
//    if(searchby === 'Profile'){
//         instance.get(`users/searchuser/${this.state.query}`)
//             .then(response=>{
//                     this.setState({profile: response.data.response})
//                     console.log(response)
//     })
//     }
     if(searchby === 'Product' || searchby === 'Activity'){
        const type = searchby.toLowerCase()
        console.log('query',this.state.query)
        instance.get(`product/searchproducts/${type}/query/${this.state.query}`)
            .then(response=>{
                console.log('responsetype', response)
                    this.setState(
                        {[ type ] : response.data.response,
                          clicked : true
                    })
                })
            .then(()=>console.log('activity',this.state)
                 )
    }else{
        instance.get(`users/searchuser/${this.state.query}`)
            .then(response=>{
                    this.setState({
                        profile: response.data.response,
                        searchby : 'Profile'
                    
                    })
                    console.log('type',response)
    })
    }
   console.log('theseprops',this.props)
   
};

  handleChange=(e)=>{
      this.setState({ query: e.target.value })
    

  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    console.log(event.currentTarget)
  };

  handleClose = (e, option) => {
    this.setState({ 
        anchorEl: null,
        searchby : option,
     });
    console.log('hey', option)
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let list = this.props.history.location.pathname.split('/')
    console.log(list[1])

    return (<>
    <div className='searchcontainer'>
        <div className='searchrow'>
            <input className='searchbars' type="text" placeholder="Search" name='' onChange={e=>this.handleChange(e)} ></input>  
         <div className='icon'><img src="https://img.icons8.com/material/24/000000/search.png" alt="Search" onClick={this.searchby}></img></div>
    
        </div>
        <div className='searchicon'>
            <div >
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={e=>this.handleClose(e, option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
 
</div>

{
    list[1]=== 'search' ?
<ProductlistingsView searchresults={this.state}/> : null

}
    </>)

  }
}

export default withRouter(Searchbar);