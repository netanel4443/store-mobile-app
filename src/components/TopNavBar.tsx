import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions/topNavBarActions'
import { RootState } from '../reducers/rootReducer'
import StoreOwnerDetails from '../data/StoreOwnerDetails'
import { View , StyleSheet,  TouchableOpacity,Image, Linking} from 'react-native'
import {Icon} from 'react-native-elements'
import StroreOwnerDetailsModal from './modals/StroreOwnerDetailsModal'
import * as RootNavigation from '../ui/navigation/RootNavigation'
import SimpleSpinnerModal from './modals/SimpleSpinnerModal'



function TopNavBar() {
  /*SOD= StoreOwnerDetails*/

  const dispatch = useDispatch()
  const details:StoreOwnerDetails=useSelector((state:RootState)=>state.topNavBarReducer.storeOwnerDetails)
  const stroreOwnerDetailsModalVisibility=useSelector((state:RootState)=>state.topNavBarReducer.stroreOwnerDetailsModalVisibility)
  const isLoading:boolean=useSelector((state:RootState)=>state.topNavBarReducer.isLoading)
  const isEditSODBtnEnabled:boolean=useSelector((state:RootState)=>state.topNavBarReducer.isEditSODBtnEnabled)

  useEffect(() => {

  dispatch(actions.getStoreOwnerDetailsFromDb())
  
  }, [])


  const changeStoreOwnerDetailsModalVisibility=(visibility:boolean)=>{
    dispatch(actions.changeStoreOwnerDetailsModalVisibility(visibility))
  }

  return (
    <View>
      <View  style={styles.topNavBar}>
 
        <Icon name='edit'  
         disabled={isEditSODBtnEnabled} 
         onPress={()=>changeStoreOwnerDetailsModalVisibility(true)}/>

        {(details.fbUrl!=="")?  <Icon name='facebook' onPress={()=>dispatch(actions.checkAndOpenUrl(details.fbUrl))}/>:null}
        {(details.instagramUrl!=="")?<Icon name='instagram' type='font-awesome-5' onPress={()=>dispatch(actions.checkAndOpenUrl(details.instagramUrl))}/>:null}
        {(details.location!=="")? <Icon name='location-pin'/>:null}

        <Icon name='shopping-cart'
        onPress={()=>RootNavigation.navigate('Shopping Cart')}
       />

      </View>
      <StroreOwnerDetailsModal 
        isVisible={stroreOwnerDetailsModalVisibility}
        onConfirmation={(newDetails)=>dispatch(actions.updateStoreOwnerDetailsInDb(newDetails))}
        setVisibility={(visibility)=>changeStoreOwnerDetailsModalVisibility(visibility)}
        currentDetails={details}
      />

      <SimpleSpinnerModal isVisible={ isLoading }/>
    </View>
  )
}

const styles=StyleSheet.create({
  topNavBar:{
    display:"flex",
    flexDirection:"row",
    height:50,
    justifyContent:'space-evenly',
    alignItems:"center",
  },

  storeOwnerDetailsLogo:{
    height:24,
    width:24
  }
})


export default TopNavBar
