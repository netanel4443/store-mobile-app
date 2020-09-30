import *as types from '../actions/types/homeActionTypes'
import { ProductDetails } from '../data/ProductDetails'
import {HomeReducer} from './types/index'

const initialState:HomeReducer={
  //Map<category name,category Id>
  categories:new Map<string,string>(),
  loadingSpinnerVisibility:false,
  addProductModalVisibility:false,
  addCategoryModalBtnDisabled:false,
  modalsMessage:'',
  messageModalVisibility:false,
  productsDetailsFromDb:new Map<string,Map<string,ProductDetails>>(),
  selectedProductDetails:new ProductDetails(),
}

export default (state:HomeReducer=initialState,action:any)=>{

  switch(action.type){
  case  types.GET_CATEGORIES:
    return{
        ...state,
        categories:action.categories
    }
  case types.GET_PRODUCTS:
    return{
      ...state,
      productsDetailsFromDb:action.products
    }  

  case types.SHOW_OR_HIDE_SPINNER:
    return{
      ...state,
      loadingSpinnerVisibility:action.visibility
    }

  case types.SHOW_ADD_PRODUCT_MODAL_VISIBILITY:
    return{
      ...state,
      addProductModalVisibility:action.visibility,
      selectedProductDetails:action.selectedProductDetails
    }   

  case types.ADD_CATEGORY_MODAL_BTN_DISABLED:
    return{
      ...state,
      addCategoryModalBtnDisabled:action.disabled
    }
  case types.MODALS_MESSAGE_TO_USER:
    return{
      ...state,
      modalsMessage:action.modalsMessage,
      messageModalVisibility:action.visibility
    }
  case types.ADD_PRODUCT_MODAL_ERRORS:
    return{
      ...state,
      productModalErrorsMessage:action.errors
    }      

    default: return state
  }

}
