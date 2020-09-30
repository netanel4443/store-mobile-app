import 'react-native-gesture-handler';//has to be first, nothing above
import React from 'react'
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {name as appName} from './app.json';
import rootReducer from './src/reducers/rootReducer'
import thunk from 'redux-thunk'
import Home from './src/components/Home'
import { createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/ui/navigation/RootNavigation'
import ShoppingCart from './src/components/ShoppingCart';

const store=createStore(rootReducer,applyMiddleware(thunk))
const Stack = createStackNavigator();

const storeApp=()=>{
  return(
    <Provider store={store}>
     <NavigationContainer ref={navigationRef}>
       <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Home" component={Home} 
         options={{
           headerShown:null
         }}
         />
         <Stack.Screen name="Shopping Cart" component={ShoppingCart}
            options={{  headerShown:null }}
         />
       </Stack.Navigator>
     </NavigationContainer>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => storeApp);
