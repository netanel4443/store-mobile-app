import StoreOwnerDetails from "../data/StoreOwnerDetails"
import * as types from '../actions/types/topNavBarActionTypes'
import { TopNavBarReducer } from "./types"


const initialState={
  storeOwnerDetails:new StoreOwnerDetails(),
  stroreOwnerDetailsModalVisibility:false,
  isLoading:false,
  isEditSODBtnEnabled:true
}

export default (state:TopNavBarReducer=initialState,action:any)=>{
  switch(action.type){
    case types.GET_STORE_OWNER_DETAILS:
      
      return {
        ...state,
        storeOwnerDetails:action.storeOwnerDetails,
      }
    case types.ENABLE_OR_DISABLE_SOD_BTN:
      return{
        ...state,
        isEditSODBtnEnabled:action.disabled
      }  
    
    case types.CHANGE_STORE_OWNER_DETAILS_MODAL_VISIBILITY:
      return{
        ...state,
        stroreOwnerDetailsModalVisibility:action.visibility
      }

    case types.SHOW_OR_HIDE_SPINNERR:
      return{
        ...state,
        isLoading:action.visibility
      }   

     default: return state
  }
  
}