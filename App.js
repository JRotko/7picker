
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as sampleData from './sample_data.json'


export default function App() {
  const [data, setData] = useState([])
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState()
  

  
  const getData = () => {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=3fe24b29e5df236b9218c81e22380713')
    .then(response => response.json())
    .then(responseData => setData(responseData.rates))
    .catch(error => {
      Alert.alert('Error', error)
    })
  }
  

    
  

  useEffect(() => {
    getData()
  }, [])

  
  var currencies = Object.keys(data)
  

  let pickerGenerator = (curr) => {    
    return <Picker.Item label={curr} value={curr} />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{(amount * data[currency]).toFixed(2)} €</Text>
      <TextInput placeholder='Amount' onChangeText={text => setAmount(parseInt(text))} />
      <Picker
        selectedValue={currency}
        onValueChange={(itemValue, itemIndex) =>
          setCurrency(itemValue)
        }>
        {currencies.map(pickerGenerator)}
      </Picker>
      <Button title='Calculate' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
