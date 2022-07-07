import { View, Text,Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React,{useState} from 'react';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    onChangeText={email =>setEmail(email)
  }
  />
    <TextInput
      label="Password"
      value={password}
      mode="outlined"
      placeholder='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
      secureTextEntry={true}
      onChangeText={password =>{
      const passw=  /^[A-Za-z]\w{7,14}$/;
      if(password.match(passw))
      setPassword(password)
      else
      Alert.alert("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters")
      }}
    />
    <TextInput
      label="Confirm Password"
      value={confirmPassword}
      mode="outlined"
      secureTextEntry={true}
      onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
    />
    <Button mode="contained" style={styles.text} onPress={() => {
      if(password!=confirmPassword )
      Alert.alert("Confirm Password Doesn't Match");
      else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
      Alert.alert("You have entered an invalid email address!");
      else 
        userSignUp();
    }}>
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