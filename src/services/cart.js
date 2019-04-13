const uuidv1 = require('uuid/v1');

class Storage{
 constructor(){   
 }
 
 updateStorage=(product)=>{
   if(!localStorage.getItem('cart')){
        const array = []
        localStorage.setItem('cart', JSON.stringify(array))
   }
   const locArr=[]
   const gotLocal = localStorage.getItem('cart')
   const parsedLocal= JSON.parse(gotLocal)
   for(let i=0; i< product.length; i++){
        locArr.push(product[i])
    } 
   const updLoc = parsedLocal.concat(locArr)
   console.log('cServ', updLoc)
   localStorage.setItem('cart', JSON.stringify(updLoc))
 }


 updateCheckoutStorage=(state)=>{
   let locArr=[]
   if(state.firstName ==='' || state.lastName ===''|| state.address1 ===''||state.city===''||state.state===''||state.zip===''||state.country===''){
     alert('Some information is missing')
   }else{
     locArr=[state.firstName,state.lastName,state.address1,state.address2,state.city,state.state,state.zip,state.country ]

   }
 
  console.log('checkoutlocal', locArr)
  localStorage.setItem('checkout', JSON.stringify(locArr))
}


updatePaymentStorage=(state)=>{
 let locArr =[]

if(state.cardName===''|| state.cardNumber===''|| state.expDate===''|| state.cvv===''){
  alert('Some information is missing')
}else{
  locArr=[ state.cardName, state.expDate, state.cvv, state.cardNumber ]
}
  
  console.log('paymentlocal', locArr)
  localStorage.setItem('payment', JSON.stringify(locArr))

}

getLocalStorage=()=>{
     localStorage.getItem('cart')
     const stored = JSON.parse(localStorage.getItem('cart'))
     return stored
}

getCheckoutStorage=()=>{
  localStorage.getItem('checkout')
  const stored = JSON.parse(localStorage.getItem('checkout'))
  return stored
}

getPaymentStorage=()=>{
  localStorage.getItem('checkout')
  const stored = JSON.parse(localStorage.getItem('payment'))
  return stored
}
createGuestId=()=>{
   const guest_id = uuidv1()
   return guest_id
 }

rid=()=>{
return localStorage.clear()
}

}




const cartStorage = new Storage();


export default cartStorage;