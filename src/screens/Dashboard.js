import {View, Text, StyleSheet, StatusBar, Image, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [loading, setLoading] = useState(true);
  console.log('currentValue currentValue ::', currentValue);

  const [weatherData, setWeatherData] = useState([]);
  console.log('weather data ===', weatherData);
  //   City Names
  const cities = [
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Lucknow', value: 'Lucknow'},
    {label: 'Hyderabad', value: 'Hyderabad'},
    // {label: 'Ghazipur', value: 'ghazipur'},
    // {label: 'Dildarnagar', value: 'DildarNagar'},
  ];
  //   Fetching Weather
  const getWeatherData = async () => {
    try {
      const API_KEY = '877531e5296589429a7893cddfb52eb3';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=${API_KEY}`,
      );
      console.log(response);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(`Unable to get Api Data ${error}`);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, [currentValue]);
  const kelvinToCelsius = kelvin => {
    return (kelvin - 273.15).toFixed(2); // Keep 2 decimal places
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Text style={styles.Txt}>Weather</Text>
        <View style={styles.dropdown}>
          <DropDownPicker
            items={cities}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={currentValue}
            setValue={val => {
              setCurrentValue(val);
            }}
            maxHeight={110}
            placeholder="Select Your City"
            disableBorderRadius={false}
            autoScroll
            theme="LIGHT"
            mode="BADGE"
          />
        </View>
        <View style={styles.weatherView}>
          {loading ? (
            <Text style={{color: 'white'}}>Fetching weather data...</Text>
          ) : weatherData ? (
            <View style={styles.View1}>
              <View style={styles.View2}>
                <Image
                  source={require('../assets/images/location.png')}
                  style={styles.Img1}
                />
                <Text style={styles.city}>{weatherData.name}</Text>
              </View>
              <Image
                style={styles.Img2}
                source={require('../assets/images/cloud-shadow.png')}
              />
              <View style={{alignItems: 'center'}}>
                <Text style={styles.temp}>
                  {kelvinToCelsius(weatherData.main.temp)}&#176;
                </Text>
                <Text style={styles.weather}>
                  {weatherData.weather[0].description}
                </Text>
              </View>
              <View style={styles.View3}>
                <Image
                  source={require('../assets/images/wind2.png')}
                  style={styles.Img3}
                />
                <Text style={styles.wind}>{weatherData.wind.speed} km/h</Text>
                <Image
                  source={require('../assets/images/humidity2.png')}
                  style={styles.Img4}
                />
                <Text style={styles.wind}>{weatherData.main.humidity}%</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    ...Platform.select({
      android: {
        backgroundColor: 'white',
      },
      ios: {
        backgroundColor: 'white',
        paddingTop: 35,
      },
      default: {
        backgroundColor: 'whitesmoke',
      },
    }),
  },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  Txt: {
    fontSize: 30,
    color: '#f0f',
    marginTop: 10,
  },
  dropdown: {
    width: '80%',
    marginTop: 20,
    height: 180,
    // backgroundColor: 'red',
  },
  weatherView: {
    ...Platform.select({
      android: {
        backgroundColor: '#292d3e',
        width: '90%',
        height: 420,
        marginTop: 10,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 20,
      },
      ios: {
        backgroundColor: '#292d3e',
        width: '90%',
        height: 400,
        marginTop: 10,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 20,
      },
      default: {
        backgroundColor: '#292d3e',
        width: '90%',
        height: 400,
        marginTop: 10,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 20,
      },
    }),
    // backgroundColor: '#292d3e',
    // width: '90%',
    // height: 400,
    // marginTop: 10,
    // borderRadius: 20,
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
    // padding: 20,
  },
  city: {
    color: 'white',
    fontSize: 26,
    fontWeight: '800',
  },
  temp: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  weather: {
    color: 'white',
    fontSize: 30,
  },
  wind: {
    color: 'white',
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 3,
  },
  View1: {
    width: '100%',
    height: '100%',
    // flexDirection: 'row',
  },
  View2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Img1: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 5,
  },
  Img2: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    margin: 20,
  },
  View3: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 40,
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    // borderColor: '#f0f',
  },
  Img3: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 5,
    marginTop: 5,
  },
  Img4: {
    ...Platform.select({
      android: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 120,
        marginTop: 5,
      },
      ios: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 95,
        marginTop: 5,
      },
      default: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 95,
        marginTop: 5,
      },
    }),
  },
});
