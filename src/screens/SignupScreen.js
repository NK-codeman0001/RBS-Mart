import { View, Text,Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React,{useState} from 'react';
import { TextInput, Buttoni } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const userSignUp = async () =>{
  if(!email || !password){
    return(Alert.alert("Please fill all fields"))
  }
  try{
    const result = await auth().createUserWithEmailAndPassword(email,password)
  }
  catch(err){
    Alert.alert(`Something went wrong ${err}`)
  }
}

  return (
    <View >
      <View>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Sign Up!</Text>
      
     <TextInput
    label="Email"
    value={email}
    mode="outlined"
    onChangeText={email => setEmail(email)}
  />
    <TextInput
      label="Password"
      value={password}
      mode="outlined"
      secureTextEntry={true}
      onChangeText={password => setPassword(password)}
    />
    <Button mode="contained" style={styles.text} onPress={() => userSignUp()}>
    Sign Up
  </Button>
  <TouchableOpacity onPress={()=>navigation.navigate("Login")}><Text style={styles.link}>Already have an account? click here</Text></TouchableOpacity>
  </View>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container:{
  justifyContent:"space-evenly",
  height:"55%",
  paddingHorizontal:40,
  },
  logo:{
  marginTop:50,
   alignSelf:"center",
  },
  text:{
    paddingVertical:10,
    alignSelf:"center",
    fontSize:44,
    color:"black",
  },
  link: {
    alignSelf:"center",
    color:"blue",
    fontSize:15,
  }
});
export default SignUpScreen;