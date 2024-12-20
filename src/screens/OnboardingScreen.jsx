import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image, Dimensions } from 'react-native';
import Button from '../components/button/Button';
import ProgressBar from '../components/progressBar/ProgressBar';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/img/image1.png'),
    title: 'Exclusive Gift Cards,\nBig Savings',
    description: 'Access top brands with discounts on \nevery purchase.',
  },
  {
    id: '2',
    image: require('../assets/img/image1.png'),
    title: 'Exclusive Gift Cards,\nBig Savings',
    description: 'Access top brands with discounts on \nevery purchase.',
  },
  {
    id: '3',
    image: require('../assets/img/image1.png'),
    title: 'Exclusive Gift Cards,\nBig Savings',
    description: 'Access top brands with discounts on \nevery purchase.',
  }
];

const OnboardingScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleComplete = nextIndex => {
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({ index: nextIndex });
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.pixel_10_space}/>
      <View style={styles.pixel_10_space}/>
      <Button
        title={currentIndex === slides.length - 1 ? 'Start Now' : 'Next'}
        onPress={handleNext}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ProgressBar segments={slides.length} activeIndex={currentIndex} onComplete={handleComplete} />
      <FlatList
        data={slides}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: height * 0.48,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#272B30',
  },
  description: {
    fontSize: 14,
    color: '#6A7178',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  pixel_10_space: {
  padding: 10,
},
});

export default OnboardingScreen;
