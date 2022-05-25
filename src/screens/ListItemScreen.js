import { View, Text,FlatList, Linking, StyleSheet,} from 'react-native'
import React,{useEffect,useState} from 'react'
import { Avatar, Button, Card, Title, Paragraph,Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';



const ListItemScreen = () => {
  const [loading,setLoading] = useState(false)
  const [items,setItems] = useState([])
  const getDetails = async () => {
    const querySnap = await firestore().collection('ads').get()
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
    <View>
        
      <FlatList
      data={items.reverse()}
      inverted={false}
      onRefresh = {()=>{
        setLoading(true)
        getDetails()
        setLoading(false)
      }}
      refreshing={loading}
      keyExtractor={(item)=>item.phone}
      renderItem={({item})=><>
      <Card style={styles.card}>
    <Card.Title title={item.name} 
    subtitle={`Posted by ${item.user}`}  />
    <Card.Content>
    <Paragraph>{`Posted on ${item.postDate}`}</Paragraph>
    <Paragraph>{`Year of Purchase : ${item.year}`}</Paragraph>
      <Paragraph>{item.desc}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: `${item.image}` }} />
    <Card.Actions>
      <Button  onPress={() => console.log('pressed')}>{`Price: \u20B9${item.price}`}</Button>
      <Button icon="phone" onPress={() => Linking.openURL(`tel:+91${item.phone}`)}>Call Seller</Button>
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
    card:{
        margin: 10,
        elevation:2,
    }
});

export default ListItemScreen