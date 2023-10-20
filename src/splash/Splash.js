import {View, Text, Image, ImageBackground, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Drawer');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../assets/images/blue-bolt.webp')}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(0,0,0, 0.2)',
          }}>
          <Image
            source={require('../assets/images/cloudy.png')}
            style={{
              width: 250,
              height: 250,
              resizeMode: 'cover',
              alignSelf: 'center',
              marginTop: 100,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 35,
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: 40,
              marginTop: 50,
            }}>
            Weather
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
