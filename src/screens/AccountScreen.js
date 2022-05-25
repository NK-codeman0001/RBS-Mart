import {TouchableOpacity, Linking, View, Text, StyleSheet,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Button, Card, Title, Paragraph,Divider} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AccountScreen = () => {
  const [loading,setLoading] = useState(false)
  const [items,setItems] = useState([])
  const getDetails = async () => {
    const querySnap = await firestore().collection('ads').where('uid','==',auth().currentUser.uid).get()
    const result = querySnap.docs.map(docSnap=>docSnap.data())
    setItems(result)
  }

  useEffect(()=>{
    getDetails()
    return ()=>{
      console.log('cleanup')
    }
  },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Linking.openURL("https://forms.gle/C5Hvd7QbgxCUnFbE6")}>
    <Text style={{color: 'blue'}}>
      Please spend some time for feedback (click here)
    </Text>
    </TouchableOpacity>
      <Text style={styles.text}>{auth().currentUser.email} </Text>   
    <Button mode="contained" style={styles.button} onPress={() => auth().signOut()}>
    Logout
  </Button>
  <Text style={styles.text}> Your posted Ad! </Text>
    
  <FlatList
    style={styles.text}
    data={items}
    onRefresh = {()=>{
      setLoading(true)
      getDetails()
      setLoading(false)
    }}
    refreshing={loading}
    inverted={false}
    keyExtractor={(item)=>item.phone}
    renderItem={({item})=><>
    <Card style={styles.card}>
  <Card.Title title={item.name} subtitle={`Posted on ${item.postDate}`} />
  <Card.Content>
  <Paragraph>{`Year of Purchase : ${item.year}`}</Paragraph>
    <Paragraph>{item.desc}</Paragraph>
  </Card.Content>
  <Card.Cover source={{ uri: `${item.image}` }} />
  <Card.Actions>
    <Button  onPress={() => console.log('pressed')}>{`Price: \u20B9${item.price}`}</Button>
    <Button icon="pen"  onPress={() => console.log('pressed')}>Edit Post</Button>
  </Card.Actions>
</Card>
<Divider/>
    </>
  }
    />
    </View> 
  )
}


const styles = StyleSheet.create({
  text:{
    fontSize:25,
    color:"black",
  paddingVertical:10,
  },
  button:{
    fontSize:25,
    color:"black",
  paddingVertical:10,
  },
  card:{
    margin: 10,
    elevation:2,
},
container : {
  flex:1,
  justifyContent:"center",
  alignItems:"center",
}
});

export default AccountScreen