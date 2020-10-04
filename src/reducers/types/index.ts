import { AddProductModalErrors } from "../../data/AddProductModalErrors";
import { ImageToUploadDetails } from "../../data/ImageToUploadDetails";
import { ProductDetails } from "../../data/ProductDetails";
import StoreOwnerDetails from "../../data/StoreOwnerDetails";


export interface HomeReducer{
  categories:Map<string,string>,
  loadingSpinnerVisibility:boolean,
  addProductModalVisibility:boolean,
  addCategoryModalBtnDisabled:boolean,
  modalsMessage:string,
  messageModalVisibility:boolean,
  productsDetailsFromDb: Map<string,Map<string,ProductDetails>>,
  selectedProductDetails: ProductDetails,
  productModalErrorsMessage:AddProductModalErrors,
  imageDetails:ImageToUploadDetails,
  addCategoryModalVisibility:boolean
}
export interface ShoppingCartReducer{
  savedProducts: Map<string,ProductDetails>,
  totalPrice:number
}

export interface TopNavBarReducer{
  storeOwnerDetails:StoreOwnerDetails,
  stroreOwnerDetailsModalVisibility:boolean,
  isLoading:boolean,
  isEditSODBtnEnabled:boolean
}

export interface ShoppingCartReducer{
savedProducts: Map<string,ProductDetails>,
totalPrice:number,
clickedProductKey:string | undefined
}