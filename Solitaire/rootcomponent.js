import * as React from 'react';
import { View, Text, StatusBar, SafeAreaView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo'

//Components
import Board from './components/Board'
import GameInfo from './components/Gameinfo'
import PaymentInfo from './components/Paymentinfo'
import CameraRoll from './components/Cameraroll'

const Stack = createStackNavigator();

class RootComponent extends React.Component {
  
  constructor() {
    super();
    this.state = {
      connection_Status: false
    }
  }

  componentDidMount() {
    this.CheckConnectivity()
  }

  CheckConnectivity = () => {
    // For Android devices
    NetInfo.addEventListener(this.handleConnectivityChange);
  };

  handleConnectivityChange = state => {
    console.log("handleConnectivityChange",state)
    if (state.isConnected) {
      this.setState({connection_Status: true});
    } else {
      this.setState({connection_Status: false});
    }
  };

  render() {
    return (
      <NavigationContainer>
        
        {this.state.connection_Status && 
        <Stack.Navigator initialRouteName="Board">
          <Stack.Screen name="Board" component={Board} options={{ headerShown: false }} />
          <Stack.Screen name="GameInfo" component={GameInfo} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentInfo" component={PaymentInfo} options={{ headerShown: false }} />
          <Stack.Screen name="CameraRoll" component={CameraRoll} options={{ headerShown: false }} />
        </Stack.Navigator>}

        {!this.state.connection_Status && 
        <Stack.Navigator initialRouteName="GameInfo">
        <Stack.Screen name="GameInfo" component={GameInfo} options={{ headerShown: false }} />
        </Stack.Navigator>}
      </NavigationContainer>
    );
  }
}

export default RootComponent;
