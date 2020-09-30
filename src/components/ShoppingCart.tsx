import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions/shoppingCartActions'
import { ProductDetails } from '../data/ProductDetails'
import { RootState } from '../reducers/rootReducer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View , StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { color } from 'react-native-reanimated'


function ShoppingCart() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getShoppingCartProducts())  
  }, [])

  const savedProducts:Map<string,ProductDetails>=useSelector((state:RootState)=>state.shoppingCartReducer.savedProducts)
  const totalPrice=useSelector((state:RootState)=>state.shoppingCartReducer.totalPrice)
  const clickedProduct:string|undefined=useSelector((state:RootState)=>state.shoppingCartReducer.clickedProductKey)


  const productsDesign=()=>{
    const prodcutsArr:any=[]
    savedProducts.forEach((savedProduct:ProductDetails,key)=>{
      prodcutsArr.push(
        <TouchableOpacity style={styles.savedProduct} key={key}
         onPress={()=>{ dispatch(actions.setClickedProduct(key))}}
          >
          <Image style={styles.savedProductImage} source={{uri:savedProduct.imageUrl}}/>
          <TouchableOpacity
             style={styles.savedProductDeleteIcon}
             onPress={()=>{   dispatch(actions.deleteProductFromDb(key,totalPrice))}} >
          <Icon  name={'trash'} color={'red'} />
          </TouchableOpacity>
        </TouchableOpacity>
        
        )
    })
    return prodcutsArr
  }
 
  return (
    <View style={styles.mainParentShoppingCart}>

      <View style={styles.textsInRow}>
        <Text>Total products: {savedProducts.size}</Text>
        <Text>Total price: <Text style={styles.savedProductCategoryPrice}>{totalPrice}$</Text></Text>
      </View>
     
      {clickedProduct!==undefined ?(
        <View style={styles.clickedSavedProduct}>
        <Image style={styles.clickedImg} source={{uri:savedProducts.get(clickedProduct)?.imageUrl}}/>
        <View style={styles.clickedProductCard}>
          <View style={styles.textsInRow}>
            <Text >{savedProducts.get(clickedProduct)?.productName}</Text>
            <Text style={styles.savedProductCategoryPrice} >{savedProducts.get(clickedProduct)?.price}$</Text>
          </View>
          <ScrollView style={{marginTop:5}}>
            <Text >{savedProducts.get(clickedProduct)?.productDescription}</Text>
          </ScrollView>
        </View>
        </View>
      ):(null)
      }
      
      <ScrollView horizontal={true} style={styles.savedProductsScrollView} >
          {productsDesign()}
        </ScrollView>
      
     
    </View>
  )
}
const styles=StyleSheet.create({
  mainParentShoppingCart:{
    height:'100%',
    display:"flex",
    margin: 10,
  },
  savedProductsScrollView:{
    flex:1,
    width:"100%",

  },
  savedProductDeleteIcon:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    borderWidth:1,
    height:30,
    borderRadius:5
  },
  savedProduct:{
    display: "flex",
    marginHorizontal:5,
  },
  savedProductImage:{
    width:100,
    height:100,
    borderRadius:10
  },
  clickedSavedProduct:{
    flex:2,
    display: "flex",
    marginTop:10,
    marginBottom:10,
  },
  clickedImg:{
   flex:2
  },
  clickedProductCard :{
    flex:1,
    display: "flex",
    fontFamily:"sans-serif",
  },
  savedProductCategoryPrice:{
      color:'lightgreen',
  },
  textsInRow:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-around',
  }

})

export default ShoppingCart
