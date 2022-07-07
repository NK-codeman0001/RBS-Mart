import { View, FlatList, Linking, StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import { IconButton,Button, Card, Paragraph,Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';



const ListItemScreen = () => {
  const [loading,setLoading] = useState(false)
  const [items,setItems] = useState([])
  const getDetails = async () => {
    const querySnap = await firestore().collection('ads').get()
    const result = querySnap.docs.map(docSnap=>docSnap.data())
    setItems(result)

  }
const whatsAppMsg=(phone,productName)=>{
  const msg = `Hi,Hope you are doing well I am intrested in ${productName} Ad you had posted on RBS Mart. Please, let me know can when we have a chat.`;
  const url = `whatsapp://send?text=${msg}&phone=+91${phone}`;
        Linking.openURL(url);
}

const textMsg= async (phone,productName)=>{
  const msg = `Hi,Hope you are doing well I am intrested in ${productName} Ad you had posted on RBS Mart. Please, let me know can when we have a chat.`;
  const separator = Platform.OS === 'ios' ? '&' : '?';
  const url = `sms:+91${phone}${separator}body=${msg}`;
  Linking.openURL(url);
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
      <IconButton icon="phone" onPress={() => Linking.openURL(`tel:+91${item.phone}`)}></IconButton>
      <IconButton icon="message" onPress={() =>textMsg(item.phone,item.name)}>Call Seller</IconButton>
      <IconButton icon="whatsapp" onPress={() => whatsAppMsg(item.phone,item.name)}>Whatsapp Seller</IconButton>
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