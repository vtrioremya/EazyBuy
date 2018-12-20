import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'

import Splash from '../Containers/Splash'
import HomeScreen from '../Containers/HomeScreen'

export const Stack = StackNavigator({
  Splash : {screen: Splash},
  HomeScreen : {screen: HomeScreen}

},{
  initialRouteName: 'HomeScreen'
})
