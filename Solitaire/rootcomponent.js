import * as React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Board from './components/Board'
import GameInfo from './components/Gameinfo'
import PaymentInfo from './components/Paymentinfo'
import CameraRoll from './components/Cameraroll'

const Stack = createStackNavigator();

function RootComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Board">
        <Stack.Screen name="Board" component={Board} options={{ headerShown: false }}/>
        <Stack.Screen name="GameInfo" component={GameInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentInfo" component={PaymentInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="CameraRoll" component={CameraRoll} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootComponent;
