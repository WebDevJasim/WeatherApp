import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  // console.log(
  //   `User Name : ${name}, User Phone : ${phone}, User Message : ${message}`,
  // );

  const saveUserData = async () => {
    if (name < 1 && phone < 1 && message < 1) {
      Alert.alert('Please fill out all required fields.');
    } else {
      try {
        await AsyncStorage.setItem('userName', name);
        await AsyncStorage.setItem('userPhone', phone);
        await AsyncStorage.setItem('userMessage', message);
        setName('');
        setPhone('');
        setMessage('');
        Alert.alert('message sent successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const Name = await AsyncStorage.getItem('userName');
      const Phone = await AsyncStorage.getItem('userPhone');
      const Message = await AsyncStorage.getItem('userMessage');
      console.log('getting user data', Name, Phone, Message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.maincontainer}>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        <Text style={styles.Txt}>Welcome !!</Text>
        <View style={styles.TxtInpView}>
          <Text style={styles.contact}>Contact Us</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
          />
          <TextInput
            placeholder="Message"
            placeholderTextColor="white"
            style={styles.message}
            onChangeText={setMessage}
            value={message}
          />
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              saveUserData();
            }}>
            <Text style={styles.BtnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  maincontainer: {
    ...Platform.select({
      android: {
        backgroundColor: 'white',
      },
      ios: {
        backgroundColor: 'white',
        paddingTop: 35,
      },
      default: {
        backgroundColor: 'white',
      },
    }),
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingTop: 80,
    alignItems: 'center',
  },
  Txt: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f0f',
  },
  contact: {
    fontSize: 25,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 40,
    paddingTop: 20,
  },
  TxtInpView: {
    width: '90%',
    height: 400,
    backgroundColor: '#292d3e',
    borderRadius: 20,
    shadowColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginTop: 40,
    borderWidth: 0.5,
    borderColor: 'white',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
    height: 40,
    borderRadius: 20,
    paddingLeft: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  message: {
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
    height: 120,
    borderRadius: 20,
    paddingLeft: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  Btn: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: '#f0f',
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
