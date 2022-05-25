import { View, Text, StyleSheet,Alert} from 'react-native'
import React,{useState} from 'react'
import { TextInput, Button } from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';



const CreateAdScreen = () => {
  const time = new Date();
  const [user,setUser] = useState('')
  const [name,setName]=useState('')
  const [desc,setDesc]=useState('')
  const [year,setYear]=useState('')
  const [price,setPrice]=useState('')
  const [phone,setPhone]=useState('+91')
  const [image,setImage] = useState("")
  const [postDate,setPostDate] = useState(time.toDateString())
  const [timestamp,setTimestamp] = useState(time)
  
  const resetData = () => {
    setName("")
    setDesc("")
    setYear("")
    setPrice("")
    setPhone("")
  }

  const openCam = async () => {
    await launchCamera({quality:0.5},(fileobj)=>{
      if(fileobj){  
      const uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.assets[0].uri)
        
        uploadTask.on('state_changed', 
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(progress==100) {
        Alert.alert("Image uploaded successfully!");
      }
    }, 
    (error) => {
      Alert.alert(`${error}`)
    }, 
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setImage(downloadURL);
      });
    }
    );
   } })
    }
  

  const postData = async () =>{
    if(!name || !desc || !year || !price || !phone){
      return(Alert.alert("Please fill all fields"))
    }
      try{  
        await firestore().collection('ads')
          .add({
            name,
            desc,
            year,
            price,
            phone,
            image,
            timestamp,
            postDate,
            user,
            uid:auth().currentUser.uid,
          })
          Alert.alert(`${name}'s Ad posted`)
          resetData()
        }catch(err){
          Alert.alert(`Something went wrong ${err}`)
        }
  }

  // const openGallery = ()=>{
  // launchImageLibrary({quality:0.5},(fileobj) => {
  //     if(!fileobj){
  //     const uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.assets[0].uri)
  //     uploadTask.on('state_changed', 
  // (snapshot) => {
  //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   if(progress==100) {
  //     Alert.alert("Image uploaded successfully!");
  //   }
  // }, 
  // (error) => {
  //   Alert.alert(`${error}`)
  // }, 
  // () => {
  //   uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //     setImage(downloadURL);
  //   });
  // }
  // );}
  //   })
  // }


    return (
   
    <View style={styles.container}>
       <KeyboardAvoidingView behaviour="position">
      <Text style={styles.text}>Create Ad!!</Text>
   
      <TextInput
    label="Add Product Title"
    value={name}
    mode="outlined"
    onChangeText={name => setName(name)}
  />
  <TextInput
    label="Describe Your Product"
    value={desc}
    mode="outlined"
    numberOfLines={4}
    multiline={true}
    onChangeText={desc => setDesc(desc)}
  />
  <TextInput
    label="Year of Purchase"
    value={year}
    mode="outlined"
    keyboardType="numeric"
    onChangeText={year => setYear(year)}
  />
  <TextInput
    label="Price in INR"
    value={price}
    keyboardType="numeric"
    mode="outlined"
    onChangeText={price => setPrice(price)}
  />
  <TextInput
    label="Your Contact Number"
    value={phone}
    keyboardType="numeric"
    mode="outlined"
    onChangeText={phone => setPhone(phone)}
  />
  
     <Button icon="camera" mode="contained" style={styles.text} onPress={() => {openCam()
    setTimestamp(time)
    setPostDate(time.toDateString())
    setUser(auth().currentUser.email)
    }}>
    Upload image using Camera
  </Button>
  {/* <Text style={{color:"black",alignSelf:"center"}}>or</Text>
  <Button icon="file" mode="contained" style={styles.text} onPress={() => openGallery()}>
    Upload image from Gallery
  </Button> */}

  
  <Button mode="contained" disabled={image?false:true} style={styles.text} onPress={() => {
    postData()
    }}>
    Post Ad
  </Button>
  </KeyboardAvoidingView>
    </View>
   
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        justifyContent:"space-evenly" 
    },
    text:{
        color:"black",
        justifyContent:"space-evenly",
        marginVertical:10,
        padding:5,
        alignSelf:"center",
        fontSize:55,
      },
      button:{
        flexDirection:"row",
      }
    
  });

export default CreateAdScreen