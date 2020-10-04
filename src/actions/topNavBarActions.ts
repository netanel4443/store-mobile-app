import { Alert, Linking, Text, ToastAndroid } from 'react-native'
import *as types from '../actions/types/topNavBarActionTypes'
import {getStoreOwnerDetail} from '../data/firebaseOperations'
import StoreOwnerDetails from '../data/StoreOwnerDetails'
import { errorConsoleIfDebug, logConsoleIfDebug } from '../utils/consoleUtils'

export const getStoreOwnerDetailsFromDb=()=>async(dispatch:any)=>{
    return(
     await getStoreOwnerDetail().get()
      .then(querySnapshot=>{
          const data=querySnapshot.data() as StoreOwnerDetails
          console.log(data)
          if(data){
            dispatch({type:types.GET_STORE_OWNER_DETAILS,storeOwnerDetails:data})
          }
      })
      .catch(e=>errorConsoleIfDebug(e))
      .finally(()=>dispatch({type:types.ENABLE_OR_DISABLE_SOD_BTN,disabled:false}))
    )
}

export const updateStoreOwnerDetailsInDb=(details:StoreOwnerDetails)=>(dispatch:any)=>{
  const detailsCopy=Object.assign({},details)
 console.log(detailsCopy)
    return(
      dispatch(showOrHideLoadingSpinner(true)),
      getStoreOwnerDetail().set(detailsCopy)
      .then(()=> dispatch({type:types.GET_STORE_OWNER_DETAILS,storeOwnerDetails:detailsCopy}))
      .catch(e=>errorConsoleIfDebug(e))
      .finally(()=> 
          dispatch(showOrHideLoadingSpinner(false),
          dispatch(changeStoreOwnerDetailsModalVisibility(false))
      )
      )
    )
}

export const checkAndOpenUrl=(url:string)=>async()=>{
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    
     Alert.alert('',`Can't open this URL`)
  }
}

export const changeStoreOwnerDetailsModalVisibility=(visibility:boolean)=>{
    return{
      type:types.CHANGE_STORE_OWNER_DETAILS_MODAL_VISIBILITY,
      visibility:visibility
    }
}

export const showOrHideLoadingSpinner=(visibility:boolean)=>{
  return{
    type:types.SHOW_OR_HIDE_SPINNERR,
    visibility:visibility
  }
}