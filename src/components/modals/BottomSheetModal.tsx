import React from 'react'
import {  Modal,View,Text, ScrollView,StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../colors'
import {addOptionsArray} from '../../data/bottomSheetItems'

interface Props{
  isVisible:boolean
  setVisibility(visibility:boolean):void
  onItemPress(item:string):void
  items:typeof addOptionsArray
}

const BottomSheetModal = ({ isVisible,setVisibility,onItemPress,items}:Props) => {
  return (
      <Modal
      animationType="slide"
      visible={isVisible}
      transparent={true}> 
        <TouchableOpacity style={styles.mainView} onPress={()=>setVisibility(false)}>
          <View style={{display:'flex',maxHeight:'70%',}}>
          <ScrollView >
            {items.map(item=><Text key={item.title} style={styles.textOption} onPress={()=>onItemPress(item.title)}>{item.title}</Text>)}
          </ScrollView>
          </View>
        </TouchableOpacity>  
      </Modal>
  )
}
const styles=StyleSheet.create({
  mainView:{
    display:"flex",
    backgroundColor:colors.transparent,
    height:'100%',
    justifyContent:'flex-end'
  },
  textOption:{
    display:'flex',
    width:'100%',
    height:50,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center',
    borderBottomWidth:0.5,
  }
})

export default BottomSheetModal
