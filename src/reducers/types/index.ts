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