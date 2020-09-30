import { errorConsoleIfDebug, logConsoleIfDebug } from "../../utils/consoleUtils"

import AsyncStorage from '@react-native-community/async-storage';

const SHOPPING_CART='shoppingCart'

export const saveItemToCart=(path:string)=>{

  return AsyncStorage.getItem(SHOPPING_CART)
   .then((stored)=>{
    logConsoleIfDebug(path)
    if(stored!==null){
      const parsedStored:string[]=JSON.parse(stored)
      //if is already on list , don't add again.
      if(!parsedStored.includes(path)){
        parsedStored.push(path)
        AsyncStorage.setItem(SHOPPING_CART,JSON.stringify(parsedStored))
      }    
    }
    else{
      const tmpArray:string[]=[]
      tmpArray.push(path)  
      AsyncStorage.setItem(SHOPPING_CART,JSON.stringify(tmpArray))
    }
   }).catch(e=>errorConsoleIfDebug(e))

  
}

export const getShoppingCartItems=()=>{
  return  AsyncStorage.getItem(SHOPPING_CART)
    .then((stored)=>{
      if(stored!==null){
        logConsoleIfDebug(stored)
        return  JSON.parse(stored) 
      }
        return []
    })
    .catch(e=>{
        console.log(e)
        return  []
    })
}

export const deleteItemFromCart=(itemPath:string)=>{ 
 return AsyncStorage.getItem(SHOPPING_CART)
  .then((arrOfPaths)=>{
    const parsedArr:string[]=JSON.parse(arrOfPaths!)
    const itemIndex= parsedArr.indexOf(itemPath)
    parsedArr.splice(itemIndex,1)
    return parsedArr
  }).then((parsedArr)=>{
    AsyncStorage.removeItem(SHOPPING_CART) 
    return parsedArr
  }).then((parsedArr)=> AsyncStorage.setItem(SHOPPING_CART,JSON.stringify(parsedArr)))
  .catch(e=>errorConsoleIfDebug(e))
 
}