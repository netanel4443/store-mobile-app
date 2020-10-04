import * as types from './types/homeActionTypes'
import { ProductDetails } from '../data/ProductDetails'
import { AddProductModalErrors } from '../data/AddProductModalErrors'
import { errorConsoleIfDebug, logConsoleIfDebug } from '../utils/consoleUtils'
import * as repo from '../data/firebaseOperations'
import * as localRepo from '../data/localdatabase/cachedData'
import * as useCases from '../domain/homeUseCases'
import { addItem, addProdcut } from '../data/bottomSheetItems'
import { ImageToUploadDetails } from '../data/ImageToUploadDetails'

export const addProductCategoryToDb=(category:string,)=>{
  return (dispatch:any)=>{
    if(category!==""){
      return(
        dispatch(showLoadingModal(true)),
        dispatch(disableAddCategoryModalBtn(true)),

        repo.addCategory().doc().set({category:category})
          .then(()=>{
            dispatch(disableAddCategoryModalBtn(false))
          })
          .catch((e)=>errorConsoleIfDebug(e))
          .finally(()=>{
            dispatch(showLoadingModal(false))
          })
      )
    }
  }
}

export const showLoadingModal=(visibility:boolean)=>{
  return{
      type:types.SHOW_OR_HIDE_SPINNER,
      visibility:visibility
  }
}

export const showAddProductModalVisibility=(visibility:boolean,selectedProductDetails:ProductDetails)=>{
    return{
      type:types.SHOW_ADD_PRODUCT_MODAL_VISIBILITY,
      visibility:visibility,
      selectedProductDetails: selectedProductDetails
    }
}

export const addCategoryModalVisibility=(visibility:boolean)=>{
  return{
    type:types.ADD_CATEGORY_MODAL_VISIBILITY,
    visibility:visibility
  }
}

export const getCategoriesFromDb=()=>async(dispatch:any)=>{
    return( 
     await repo.getProductCategories().get() .then(querySnapshot=>{
        const categoryMap:Map<string,string>=new Map()
          querySnapshot.docs.forEach(category=>{
            categoryMap.set(category.get('category'),category.id)//'category' field from database 
          })      
          dispatch(categ(categoryMap))
      })
        .catch(error=>{errorConsoleIfDebug(error)})
    )
}

export const getAllProductsFromDb=()=>async(dispatch:any,getState:any)=>{
 
    const productsMap=new Map<string,Map<string,ProductDetails>>() //Map<category id,Product details>
    const getAllproducts= await repo.getAllProducts()
    return(
      getAllproducts.get().then((snapshot1)=>{
      snapshot1.forEach(categoryId=>{
       const tmpArr:string[]=[]
       const id=categoryId.id
       getAllproducts.doc(id).collection('products').get()
            .then(productSnap=>{ 
              productSnap.forEach(product=>{
                console.log('are you here2')
                const data=product.id as string
                tmpArr.push(data)
              })
              return  tmpArr
            })
            .then((stringArr)=>getProductsFromPath(stringArr))
            .then(products=>{
              if(products.size>0){
                productsMap.set(id,products)
                dispatch({ type:types.GET_PRODUCTS, products:new Map(productsMap)})
              }
            })
            .catch(e=>errorConsoleIfDebug(e))
            .finally(()=>dispatch(showLoadingModal(false)))
     })   
      }).catch((e)=>console.log(e))
    ) 
}

export const getProductsFromPath=(paths:string[])=>{
  paths.map(path=> console.log(path))
  const queryArr=paths.map(path=>repo.getProducts(path))
  return Promise.all(queryArr)
          .then((querySnapshots)=>{
              const productDetailsMap=new Map<string,ProductDetails>()
              querySnapshots.forEach(product=>{
                productDetailsMap.set(product.id,product.data() as ProductDetails)  
              })
              // new map becuase we want to make redux render it's data , because we dispatch a few times
             return productDetailsMap 
          })  
}

const categ=(categories:Map<string,string>)=>{
    return{
      type:types.GET_CATEGORIES,
      categories:categories
    }
}

export const disableAddCategoryModalBtn=(disabled:boolean)=>{
  return{
    type:types.ADD_CATEGORY_MODAL_BTN_DISABLED,
    disabled:disabled
  }
}

export const deleteProductCategoryFromDb=(category:string)=>{
  return(dispatch:any)=>{
    return(
      dispatch(showLoadingModal(true)),
      repo.deleteProductCategory(category).delete()
      .catch((e)=>dispatch(showModalMessageToUser('Could not delete.',true)))
      .finally(()=>dispatch(showLoadingModal(false)))
    )
  }
}

export const updateProduct=(categoryId:string,productDetails:ProductDetails,imageDetails:ImageToUploadDetails)=>(dispatch:any)=>{
    // console.log(`doc ${categoryId}`)
    if(productDetails.productName!==""&&productDetails.category!==""){//if name & category werent supplied, show error messages
        
      if(imageDetails.imageUri!=='' && imageDetails.imageUri!==''){//if the user picked an image
        if(productDetails.imageUrl!==""){//if there is an image at the database, delete it and upload new one.
          
          return(
            dispatch(showLoadingModal(true)),
            repo.deleteProductsImage(productDetails.imageUrl)
            .catch((e)=>{
              errorConsoleIfDebug(e)
              dispatch(showLoadingModal(false))
            })
            .then(()=> dispatch(addProductToDb(categoryId,productDetails,imageDetails)))
          )
        }
        else{//if there is not an image at the database, upload it.
          dispatch(addProductToDb(categoryId,productDetails,imageDetails))
        }
      }
      else{
        if(productDetails.imageUrl!==""){//if the user didn't pick an image & there is an image at the datbase , update product's details
           dispatch( uploadProductDetailsToDb(categoryId,productDetails))
        }
        else{ // else show error
          const errorMessages=new AddProductModalErrors()
          errorMessages.imageError='Choose an image'
          dispatch(addProductModalErrors(errorMessages))
        }
      }
  }
  else{
    const errorMessages=new AddProductModalErrors()
    if(productDetails.category===""){
      errorMessages.categoryError="Include product category"
    }
    if(productDetails.productName===""){
      errorMessages.productNameError="Include product name"
    }
    dispatch(addProductModalErrors(errorMessages))
  }
}

export const addProductToDb=(categoryId:string,productDetails:ProductDetails,imageDetails:ImageToUploadDetails)=>(dispatch:any)=>{
    
        dispatch(showLoadingModal(true))//start progress bar

        const uploadTask= repo.uploadProductImage(imageDetails.imageUri,imageDetails.imageName)
    
        return(
        uploadTask.on('state_changed',snapshot=>{},
            (error)=>{
              errorConsoleIfDebug(error.message)
              dispatch(showLoadingModal(false)) //dismiss progress bar
            },
            ()=>{//success
            uploadTask.snapshot?.ref.getDownloadURL()
                .then(url=> {
                  productDetails.imageUrl=url
                  dispatch(uploadProductDetailsToDb(categoryId,productDetails))
                })
                .catch(e=>{
                  errorConsoleIfDebug(e)
                  dispatch(showLoadingModal(false)) //dismiss progress bar
                })
            })
        )
}

export const uploadProductDetailsToDb=(categoryId:string,productDetails:ProductDetails)=>(dispatch:any)=>{
    dispatch(showLoadingModal(true))
    const productDetailsCopy=Object.assign({},productDetails)
    return(
      repo.uploadProductDetails().add(productDetailsCopy)
      .then((docRef)=>uploadProductPathToCategoryDb(categoryId,docRef.id))
      .catch(e=>errorConsoleIfDebug(e))
      .finally(()=>{
        logConsoleIfDebug('Product uploaded successfuly')
        dispatch(showLoadingModal(false))
        dispatch(showAddProductModalVisibility(false,new ProductDetails()))
      }
      )
    )
}

export const uploadProductPathToCategoryDb=(categoryId:string,path:string)=>{
 return repo.uploadProductRefToCategory(categoryId,path).set({})
}

export const addProductModalErrors=(errorMessages:AddProductModalErrors)=>{
  return{
    type:types.ADD_PRODUCT_MODAL_ERRORS,
    errors:errorMessages
  }
}

export const showModalMessageToUser=(message:string,visibility:boolean)=>{
  return {
    type:types.MODALS_MESSAGE_TO_USER,
    message:message,
    visibility:visibility
  }
}

export const addProductToCart=(path:string)=>async()=>{

  await localRepo.saveItemToCart(path)
}

export const actionByBottomSheetClick=(item:string)=>(dispatch:any)=>{
 

  switch(item){

    case addItem:{
      dispatch({type:types.ADD_CATEGORY_MODAL_VISIBILITY,visibility:true})
      break
    }

    case addProdcut:{
      dispatch(showAddProductModalVisibility(true,new ProductDetails()))
      break
    }  

  }
}

export const openGallery=()=>(dispatch:any)=>{
  useCases.pickImage().then(imageDetails=>dispatch(updateImageToUploadUri(imageDetails)))
}

export const updateImageToUploadUri=(imageDetails:ImageToUploadDetails)=>{
  return{type:types.IMAGE_TO_UPLOAD,payload:imageDetails}
}