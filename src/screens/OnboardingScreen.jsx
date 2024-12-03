import React from 'react';
import {View, StyleSheet, Image, Text, useWindowDimensions} from 'react-native';
import Button from '../components/button/Button';

const OnboardingScreen = () => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.pixel_10_space} />
      <View style={styles.pixel_15_space} />
      <Image
        source={require('../assets/img/image1.png')}
        style={[styles.image, {height: width * 0.93}]}
      />
      <View style={styles.pixel_15_space} />
      <Text style={styles.heading}>Exclusive Gift Cards, Big Savings</Text>
      <Text style={styles.description}>Access top brands with discounts on every purchase.</Text>
      <View style={styles.pixel_15_space} />
      <Button title="Get Started" onPress={() => alert('Button Pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    width: '70%',
    color:'#272B30',
  },
  description: {
    fontSize: 14,
    color: '#6A7178',
    textAlign: 'center',
    marginBottom: 20,
    width: '70%',
    marginTop:5,
    fontWeight: '500',
  },
  pixel_10_space: {
    padding: 10,
  },
  pixel_15_space: {
    padding: 15,
  },
});

export default OnboardingScreen;
