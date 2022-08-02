import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import image from './assets/bg.jpg'
export default function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = {
    key: 'dddab4732591562f5bbcc6e98e62af9e',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input, api.key]);
  return (
    <View style={styles.container}>
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.image}>
      <View>
        <TextInput
          placeholder="Enter city name and press return..."
          style={styles.textInput}
          onChangeText={text => setInput(text)}
          placeholderTextColor={'#000'}
          onSubmitEditing={fetchDataHandler}
          value={input}
        />
      </View>

    
      {data && (
        <View style={styles.infoView}>
          <Text
            style={
              styles.cityCountryText
            }>{`${data?.name}, ${data?.sys?.country}`}</Text>
          <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
          <Text style={styles.tempText}>{`${Math.round(
            data?.main?.temp,
          )} °C`}</Text>
          <Text style={styles.minMaxText}>{`Min ${Math.round(
            data?.main?.temp_min,
          )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
        </View>
      )}
    </ImageBackground>
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
  image: {
    flex: 1,
    flexDirection: 'column',
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    background: '#1e202b',
    color: 'white',
    fontSize: 19,
    fontWeight: '300',
    borderRadius: 16,
   
  },

  cityCountryText: {
    
    fontSize: 25,
    fontWeight: 'bold',
  },

  infoView: {
    alignItems: 'center',
  },

  dateText: {
   
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});
