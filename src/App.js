
import React,{useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import HomeScreen from './screens/ListItemScreen';
import AccountScreen from './screens/AccountScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = ()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
  )
}
const TabNavigator =() =>{
  return(
    
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'
              
          } else if (route.name === 'CreateAd') {
            iconName = 'post-add'
          }
          else if (route.name === 'My Account') {
            iconName = 'account-circle'
        }


          // You can return any component that you like here!
          return <Text style={styles.navbar}><MaterialIcons name={iconName} size={38} color={color} /></Text>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'deepskyblue',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CreateAd" component={CreateAdScreen} />
        <Tab.Screen name="My Account" component={AccountScreen} />
      </Tab.Navigator>
    

  )
}

const Navigation = ()=> {
 const [user,setUser] = useState("")
  useEffect(()=>{
   const unsubscribe = auth().onAuthStateChanged((userExist)=>{
     if(userExist){
        setUser(userExist)
     }
     else{
        setUser("")
     }
   })
   return ()=>{
    unsubscribe;
   }
 },[])
  return(
    
    <NavigationContainer>
      {user?<TabNavigator/>:<AuthNavigator />}      
    </NavigationContainer>
  )
}




const App = () => {
  
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="deepskyblue"/>
        <SafeAreaView style={styles.main}>
          <Navigation />
        </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"white",
  },
  navbar:{
  
  }
})
export default App;
