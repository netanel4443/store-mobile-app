import React, { useEffect, useState } from 'react'
import {TouchableOpacity, View, Text, TextInput, StyleSheet} from 'react-native'
import StoreOwnerDetails from '../../data/StoreOwnerDetails'
import { Dialog } from 'react-native-simple-dialogs';


interface Props{
  isVisible:boolean,
  setVisibility(visibility: boolean): void,
  onConfirmation(details: StoreOwnerDetails): void,
  currentDetails:StoreOwnerDetails
}

function StroreOwnerDetailsModal({isVisible,setVisibility,onConfirmation,currentDetails}:Props) {

  const [details,setDetails]=useState(new StoreOwnerDetails())

  return (
      <Dialog
        dialogStyle={styles.centeredView}
        visible={isVisible}
        onShow={()=>setDetails((Object.assign({},currentDetails)))}
        onTouchOutside={()=> setVisibility(false) }
      >
          <View style={{display:'flex', flexDirection:'column'}}>
            <Text>Facebook url:</Text>
            <TextInput multiline={true} textAlignVertical={"top"} defaultValue={currentDetails.fbUrl} style={styles.textContainer}  onChangeText={(text)=>details.fbUrl=text}/>
            <Text>Instagram url:</Text>
            <TextInput  multiline={true} textAlignVertical={"top"} defaultValue={currentDetails.instagramUrl} style={styles.textContainer} onChangeText={(text)=>details.instagramUrl=text}/>
            <Text>Location url:</Text>
            <TextInput  multiline={true} textAlignVertical={"top"} defaultValue={currentDetails.location} style={styles.textContainer} onChangeText={(text)=>details.location=text}/>
          </View>
        
        <View style={styles.btnsParent}>
          <TouchableOpacity onPress={()=>setVisibility(false)}><Text style={styles.cancelBtnText}>cancel</Text></TouchableOpacity>
          <TouchableOpacity style={styles.okBtn} onPress={()=>onConfirmation(details)}><Text>ok</Text></TouchableOpacity>
        </View>
      </Dialog>
  )
}

const styles=StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    borderRadius:3,
  },
  textContainer:{
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom:5,
    maxHeight:100
  },
  cancelBtnText:{
    color:'red',
    alignSelf:"center",
    marginTop:'auto',
    marginBottom:'auto'
  },
  okBtn:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:3,
    height:40,
    width:100,
    alignItems:"center",
    justifyContent:"center"
  },
  btnsParent:{
    display:"flex",
    flexDirection:'row',
    marginTop:20,
    justifyContent:"space-evenly"
  }
})


export default StroreOwnerDetailsModal
