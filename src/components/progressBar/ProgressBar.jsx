import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ segments = 4, activeIndex = 0 }) => {
  const animationValues = useRef(
    Array.from({ length: segments }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= segments) {
      console.error('Invalid activeIndex:', activeIndex);
      return;
    }

    animationValues.forEach((value, index) => {
      if (index !== activeIndex) {
        value.setValue(0);
      }
    });

    Animated.timing(animationValues[activeIndex], {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [activeIndex, animationValues]);

  return (
    <View style={styles.container}>
      {Array.from({ length: segments }).map((_, index) => (
        <View key={index} style={styles.segmentContainer}>
          <View style={styles.inactiveSegment} />
          <Animated.View
            style={[
              styles.segment,
              {
                width: animationValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  segmentContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 4,
    position: 'relative',
  },
  segment: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#6C5CE7',
  },
  inactiveSegment: {
    height: '100%',
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

export default ProgressBar;
