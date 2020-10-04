import React, {useState } from 'react'
import {useDispatch, useSelector,  } from 'react-redux'
import * as actions from '../../actions/homeActions'
import { RootState } from '../../reducers/rootReducer'
import { ProductDetails } from '../../data/ProductDetails'
import { AddProductModalErrors } from '../../data/AddProductModalErrors'
import { logConsoleIfDebug } from '../../utils/consoleUtils'
import {  Modal,Text,TextInput,TouchableOpacity,View,StyleSheet } from 'react-native'
import {Picker} from '@react-native-community/picker';
import { colors } from '../../colors'
import { Input } from 'react-native-elements';
import { ImageToUploadDetails } from '../../data/ImageToUploadDetails'

function AddProductModal() {

const dispatch = useDispatch()

const categories:Map<string,string>=useSelector((state:RootState)=>state.homeReducer.categories)
const errorMessages:AddProductModalErrors=useSelector((state:RootState)=> state.homeReducer.productModalErrorsMessage)
const selectedProductDetails  = useSelector((state: RootState) => state.homeReducer.selectedProductDetails)
const addProductModalVisibility = useSelector((state:RootState)=>state.homeReducer.addProductModalVisibility)
const imageDetails:ImageToUploadDetails=useSelector((state:RootState)=>state.homeReducer.imageDetails)

const [productDetails,setProductDetails]=useState(new ProductDetails())
const [selectedValue,setSelectedValue]=useState('')

const _onShow=()=>{
  dispatch(actions.addProductModalErrors(new AddProductModalErrors()))//reset error messages
  dispatch(actions.updateImageToUploadUri(new ImageToUploadDetails()))//reset image
  setProductDetails(Object.assign({},selectedProductDetails))
  logConsoleIfDebug(productDetails)

}

const _onAddAction=()=>{
  
    /*TODO: fix update and upload*/
    dispatch(actions.updateProduct(categories.get(productDetails.category)!!,productDetails,imageDetails))
  
}

const _categoryOptions=()=>{
   const optionArray:any=[]
   categories.forEach((value:string,category:string)=>{
    optionArray.push(
      <Picker.Item label={category} value={category}/>
    )
  })
  return optionArray
}
const onHide=()=>{
  dispatch(actions.showAddProductModalVisibility(false,new ProductDetails()))
}

  return (
      <Modal
        visible={addProductModalVisibility}
        onShow={_onShow}
        onRequestClose={onHide}
        transparent={true}>
       <View style={styles.mainView}>
        <View style={styles.background}>
        
          <View style={styles.viewsParent}>
            <Text style={{fontSize:20,alignSelf:'center',borderBottomWidth:0.5}}>
              Add Product
            </Text>  
          <View>
            <View style={{display:'flex', flexDirection:'column'}}>
              <Input
                    placeholder={'Product name *'}
                    leftIcon={{type:'font-awesome5',name:'subtitles'}}
                    style={styles.textInputText}  
                    defaultValue={selectedProductDetails.productName} 
                    onChangeText={(text)=>productDetails.productName=(text)}
                    errorMessage={errorMessages.productNameError}
              />
              <Input
                  placeholder={'Description'}
                  style={styles.textInputText}  
                  leftIcon={{ type: 'font-awesome5', name: 'description' }}  
                  multiline={true} numberOfLines={4}
                  defaultValue={selectedProductDetails.productDescription}
                  onChangeText={(text)=>productDetails.productDescription=(text)}/>
              <Input
                  defaultValue={selectedProductDetails.price}
                  style={styles.textInputText}  
                  keyboardType="number-pad"
                  leftIcon={{ type: 'font-awesome5', name: 'money' }}
                  label={'price'}
                  onChangeText={text=>(productDetails.price)=text}/>

              <Text style={styles.label}>Select category *:</Text>
              <Picker
                selectedValue={selectedValue} 
                onValueChange={(value)=>{
                      productDetails.category=(value.toString())
                      setSelectedValue(value.toString())
                }}>
                  {_categoryOptions()}
              </Picker>
       
            </View>  
          </View>
          <View style={{display:'flex',flexDirection:'column',marginBottom:30,justifyContent:'flex-end'}}>
            <Text  style={{borderBottomWidth:0.5,marginRight:10,width:'100%'}} 
            onPress={()=>dispatch(actions.openGallery())}>{imageDetails.imageUri}</Text>
            <Text style={{color:'red',fontSize:15}}>{errorMessages.imageError}</Text>
            <Text style={styles.label}>Select image:</Text>
          </View>
            <TouchableOpacity style={[styles.btn,{borderWidth:0.5}]}  onPress={()=>_onAddAction()}><Text>Add</Text></TouchableOpacity>  
            <TouchableOpacity style={[styles.btn,{backgroundColor:'red'}]}  onPress={onHide}><Text>Cancel</Text></TouchableOpacity>  
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
    alignSelf:'center'
  },
  viewsParent:{
   marginEnd:10,
  },
  textInputText:{
    maxHeight:70,
    alignSelf:'flex-end'
  },
  label:{
    fontSize:18,
    color:'grey',
    alignSelf:'center'
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

export default AddProductModal
