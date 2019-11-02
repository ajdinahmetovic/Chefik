import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Recent from './src/components/Recent';
import Profile from './src/components/Profile';
import Scanner from './src/components/Scanner';

const TabNavigator = createBottomTabNavigator({
  Recent: {
    screen: Recent,
    
    navigationOptions: {
      tabBarLabel: 'Recent',
      tabBarIcon: () => <Image source={require('./src/assets/recent.png')} style={{width: 27, height: 21}}/>
    }
  },

  Scanner: {
    screen: Scanner,
    
    navigationOptions: {
      tabBarLabel: 'Scanner',
      tabBarIcon: () => <Image source={require('./src/assets/scanner.png')} style={{width: 66, height: 66, marginBottom: 63}}/>
    }
  },

  Profile: {
    screen: Profile,
    
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => <Image source={require('./src/assets/profile.png')} style={{width: 18, height: 22}}/>
    }
  },

},

  {
    initialRouteName: "Recent",

    tabBarOptions: {
        showIcon: true,
        showLabel: false,
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            style:{
            backgroundColor: 'white',
                height: 52,
        },
    },
    
  },

)

let BottomTabNavigation = createAppContainer(TabNavigator);

class App extends React.Component {
  
  constructor (props){
    super(props)

  }

  render (){
    return(
      <BottomTabNavigation/>
    )
  }
}

export default App;
