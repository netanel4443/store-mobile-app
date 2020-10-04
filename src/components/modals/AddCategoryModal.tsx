import React from 'react'
import {useState} from 'react'
import { View,Modal, Text,StyleSheet, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'
import { colors } from '../../colors'

interface Props{
  isVisible:boolean,
  setVisibility(visibility: boolean): void,
  addCategory(categoryToAdd: string): void
}

function AddCategoryModal({isVisible, setVisibility,addCategory}:Props) {

  const [category,setCategory]=useState('')

  return (
      <Modal
        visible={isVisible}
        onRequestClose={()=>setVisibility(false)}
        transparent={true}>
        <View style={styles.mainView}>
        <View style={styles.background}>
          <View style={styles.viewsParent}>
        <Text style={styles.title}>Add category</Text>
    
          <View>
          <Input 
            placeholder={'Category name'}
            onChangeText={(text)=>setCategory(text)}/>
          </View>       
          <TouchableOpacity style={[styles.btn,{borderWidth:1}]} onPress={()=>addCategory(category)}><Text>add</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn,{backgroundColor:'red'}]} onPress={()=>setVisibility(false)}><Text>cancel</Text></TouchableOpacity>
          </View> 
        </View>
      </View>    
      </Modal>
  )
}

const styles=StyleSheet.create({
  mainView:{
    display:"flex",
    backgroundColor:colors.transparent,
    height:'100%',
    justifyContent:'center',
    width:'100%'
  },
  background:{
    backgroundColor:'white',
    width:'90%',
    alignSelf:'center',
    borderRadius:5
  },
  viewsParent:{
   marginEnd:10,
  },
  title:{
    fontSize:20,
    alignSelf:"center"
  },
  btn:{
    height:40,
    width:250,
    borderRadius:5,
    alignSelf:"center",
    alignItems:'center',
    justifyContent:"center",
    margin:5
  },
})


export default AddCategoryModal
