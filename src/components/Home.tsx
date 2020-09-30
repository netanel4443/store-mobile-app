import React, { useEffect } from 'react'
import {View , Text, ScrollView,StyleSheet,Image, Button, TouchableOpacity} from 'react-native'
import {useDispatch,useSelector, shallowEqual} from 'react-redux'
import { ProductDetails } from '../data/ProductDetails'
import {RootState} from '../reducers/rootReducer'
import  * as actions from '../actions/homeActions'
import { getKeyByValue} from '../utils/mapUtils'
import TopNavBar from './TopNavBar'
import SimpleSpinnerModal from './modals/SimpleSpinnerModal'
import { BottomSheet, Icon } from 'react-native-elements'

const Home = () => {

  const  dispatch = useDispatch()

  const {isLoading,modalsMessage,messageModalVisibility}= useSelector((state:RootState) =>( {
    isLoading:state.homeReducer.loadingSpinnerVisibility,
    modalsMessage:state.homeReducer.modalsMessage,
    messageModalVisibility:state.homeReducer.messageModalVisibility,
  }),shallowEqual)

  const categories:Map<string,string>=useSelector((state:RootState)=>state.homeReducer.categories)
  const products:Map<string,Map<string,ProductDetails>>=
           useSelector((state:RootState)=> state.homeReducer.productsDetailsFromDb)
  

  useEffect(() => { 
     if(products.size==0){
       dispatch(actions.getAllProductsFromDb())
       dispatch(actions.getCategoriesFromDb())

     }
  }, [])


  const tes=(product:Map<string,ProductDetails>)=>{
    const tmpArr:any=[]
    product.forEach((prod,productId)=>{
      tmpArr.push(
        <View style={styles.product} key={productId}>
          <Image style={styles.productImage} source={{uri:prod.imageUrl}}/>
          <Text>{prod.productName}</Text>
          <Text style={{color:'green'}}>{prod.price}$</Text>
          <TouchableOpacity style={styles.addToCartBtn} onPress={()=>dispatch(actions.addProductToCart(productId))}><Text>Add to cart</Text></TouchableOpacity>
        </View>
      
      )
  })
  return tmpArr
  }

  const productsByCategory=()=>{
    const prodctsDesign:any=[]
    products.forEach((product,key) => {
      prodctsDesign.push(  
        <View key={key} style={{margin:10}}>
          <Text style={{fontFamily:'serif',marginBottom:10}}>{getKeyByValue(categories,key)}</Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.productsHorizontalList} >
           {  tes(product)   }
          </ScrollView>
        </View>
      )
    });

    return prodctsDesign
  }

  return (
    <View >
      <TopNavBar />

      <ScrollView  >
    {  productsByCategory()}
      </ScrollView>
      <View style={styles.addBtn} >
      <Icon 
      name={'add'}
            reverse/>
      </View>
      
   
      <SimpleSpinnerModal isVisible={isLoading}/>
    </View>
  )
}

const styles=StyleSheet.create({
  productsHorizontalList:{
  },
  product:{
    display:"flex",
    width:     150,
    marginHorizontal:5,
  },
  productImage:{
    width:150,
    height:150,
    borderRadius:10 
  },
  addToCartBtn:{
    height:30,
    width:'100%',
    borderWidth:1,
    borderRadius:3,
    justifyContent:"center",
    alignItems:"center"
  },
  addBtn:{
    position:'absolute',
    bottom:0,
  },

})

export default Home
