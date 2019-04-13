import React from 'react';
import { Link, HashRouter } from 'react-router-dom';
import './productpageview.css';
import { Button } from 'reactstrap';
import Productlistingscard from '../productlistingscard/productlistingscard'
import Sidedashboard from '../sidedashboard/sidedashboard'
import instance from '../../services/axios'
import cartStorage from '../../services/cart'

class ProductPageView extends React.Component {
    state = {
        productinfo: [],
        prodsOfSeller: [],
        sellerid: 0,
    }

    componentDidMount() {
        const getid = this.props.location.pathname.split('/')
        const id = getid[getid.length - 1]
        instance.get(`product/${id}/product`)
            .then((response) => {
                console.log('success', response)
                this.setState({
                    productinfo: (this.state.productinfo || []).concat(response.data.response)
                })
            })
            .then(() => {
                return instance.get(`product/${this.state.productinfo[0].seller_id}/products`)

            })
            .then((response) => {
                console.log('gotprods', response)
                this.setState({
                    prodsOfSeller: (this.state.prodsOfSeller || []).concat(response.data.response)
                }, () => {
                    console.log(this.state)
                })
            })
    }
goToSeller=()=>{
    
       this.props.history.push(`/searchview/${this.state.productinfo[0].seller_id}`)
  
}

addToCart=(e,elem)=>{
       
      cartStorage.updateStorage([elem])
       
   }

    render() {
        console.log(this.props)
        console.log(this.state)
        
       
        
        return (
            <>
            
            <button className='gotoseller'onClick={this.goToSeller}>Go To Seller's Page</button> 

                <div className="productrow">
                    {/* <Productlistingscard/> */}
                    {
                        this.state.productinfo.map((e, i) => {
                            return (<>            <div onClick={event=>this.addToCart(event,e)}>🛒</div>

                            <div className="w3-row-padding " style={{ "margin": "0 -16px" }} key={i}>
                                <div className="">
                                    <h4>{e.name}</h4> 
                                    <h1>{`$${e.price}`}</h1>
                                    <img src={e.images || require('./Crab_Nebula.jpg')} style={{ "width": "100%" }} alt="Northern Lights" className="w3-margin-bottom" className='image'></img>
                                </div>
                            </div>
                                <div className="productdescription"></div>
                                <p>{e.description} </p>

                            </>)
                        })
                    }

                    <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom feedback"><i className="fa fa-thumbs-up"></i>  Like</button>
                    <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom feedback"><i className="fa fa-comment"></i>  Comment</button>

                </div>
                <br></br>

                <div className="seller">More From This Seller</div>
                <div className='featuredproductsrow'>
                    {
                        this.state.prodsOfSeller.map((e, i) => {

                            return <div className='column-2' key={i}><img src={e.images || require('./Crab_Nebula.jpg')} className='productimg' ></img>
                                     <span className="tooltiptext">{e.name}</span>
                                   </div>

                        })
                    }
                </div>
            </>
        )
    }
}

export default ProductPageView