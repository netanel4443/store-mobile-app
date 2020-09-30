import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

const CATEGORIES='categories'
const PRODUCTS='products'
const STORE_OWNER_DETAILS='storeOwnerDetails'  
const database=firestore()


export const addCategory=()=>{
  return  database.collection(CATEGORIES)
}

export const getProductCategories=()=>{
  return database.collection(CATEGORIES)        
}

export const deleteProductCategory=(category:string)=>{
  return database.collection(CATEGORIES).doc(category)
}

export const getProducts=(path:string)=>{
  return database.collection(PRODUCTS).doc(path).get()
}

export  const  getAllProducts=()=>{
  return  database.collection(CATEGORIES)
}

export const deleteProductImage=(path:string)=>{
  return storage().refFromURL(path).delete()
}

export const uploadProductImage=(image:File)=>{
  return storage().ref(image.name).put(image)
}


export const uploadProductDetails=()=>{
   return database.collection(PRODUCTS)
}

export const uploadProductRefToCategory=(categoryId:string,path:string)=>{
  return database.collection(CATEGORIES).doc(categoryId).collection(PRODUCTS).doc(path)

}

export const getShoppingCartProducts=(pathToProduct:string):
Promise<FirebaseFirestoreTypes.DocumentSnapshot>=>{
          console.log(pathToProduct)
  return  database.collection(PRODUCTS).doc(pathToProduct).get()
}

export const getStoreOwnerDetail=()=>{
  return database.collection(STORE_OWNER_DETAILS).doc('details')
}
