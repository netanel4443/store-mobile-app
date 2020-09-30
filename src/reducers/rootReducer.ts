import {combineReducers} from 'redux'
import HomeReducer from './HomeReducer'
import ShoppingCartReducer from './ShoppingCartReducer'
import TopNavBarReducer from './TopNavBarReducer'

const rootReducer=combineReducers({
  homeReducer:HomeReducer,
  shoppingCartReducer:ShoppingCartReducer,
  topNavBarReducer:TopNavBarReducer
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer