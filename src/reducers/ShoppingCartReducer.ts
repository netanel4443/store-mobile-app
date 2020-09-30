import * as types from '../actions/types/shoppingCartTypes'
import { ProductDetails } from '../data/ProductDetails'
import { ShoppingCartReducer } from './types'

const initialState:ShoppingCartReducer={
savedProducts:new Map<string,ProductDetails>(),
totalPrice:0,
clickedProductKey:undefined
}

export default (state:ShoppingCartReducer=initialState,action:any)=>{

  switch(action.type){
    case types.GET_STORED_PRODUCTS:
      return{
          ...state,
          savedProducts:action.savedProducts,
          totalPrice:action.totalPrice
      }
      
    case types.SET_CLICKED_PRODUCT:
      return{
          ...state,
          clickedProductKey:action.clickedProductKey
      }  

     default: return state  
  }
}
