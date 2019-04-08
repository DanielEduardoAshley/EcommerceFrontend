const uuidv1 = require('uuid/v1');

class Storage{
 constructor(){   
 }
 
 updateStorage=(product)=>{
   if(!localStorage){
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
   localStorage.setItem('cart', JSON.stringify(updLoc))
 }

getLocalStorage=()=>{
     localStorage.getItem('cart')
     const stored = JSON.parse(localStorage.getItem('cart'))
     return stored
}

 createGuestId=()=>{
   const guest_id = uuidv1()
   return guest_id
 }
}




const cartStorage = new Storage();


export default cartStorage;