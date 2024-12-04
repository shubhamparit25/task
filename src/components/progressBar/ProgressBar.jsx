import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ segments = 4, activeIndex = 0, onComplete }) => {
  const animationValues = useRef(
    Array.from({ length: segments }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= segments) return;

    animationValues.forEach((value, index) => {
      if (index !== activeIndex) value.setValue(0);
    });

    Animated.timing(animationValues[activeIndex], {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      if (activeIndex < segments - 1) {
        onComplete(activeIndex + 1);
      } else {
        onComplete(activeIndex);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, animationValues, onComplete]);

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    alignSelf: 'flex-start',
    marginVertical: 20,
    margin: 15,
    marginTop: 30,
  },
  segmentContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 2,
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
