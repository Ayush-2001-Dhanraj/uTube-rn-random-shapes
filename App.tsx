import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

interface containerDim {
  height: number;
  width: number;
}

const App = () => {
  const [currentColor, setCurrentColor] = useState<string>('#fff');
  const [currentShapes, setCurrentShapes] = useState<Array<JSX.Element>>([]);
  const [containerDimensions, setContainerDimensions] = useState<containerDim>({
    height: 0,
    width: 0,
  });
  const hasMounted = useRef<boolean>(false);

  const getRandomDimensions = () => {
    return [
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 100) + 50,
    ];
  };

  const getRectangle = (): JSX.Element => {
    const [rectHeight, rectWidth] = getRandomDimensions();

    const posX = Math.random() * (containerDimensions.width - rectWidth);
    const posY = Math.random() * (containerDimensions.height - rectHeight);

    return (
      <View
        style={[
          styles.shape,
          {
            backgroundColor: currentColor,
            height: rectHeight,
            width: rectWidth,
            left: posX,
            top: posY,
          },
        ]}
      />
    );
  };

  const getCircle = (): JSX.Element => {
    const [d] = getRandomDimensions();

    const posX = Math.random() * (containerDimensions.width - d);
    const posY = Math.random() * (containerDimensions.height - d);

    return (
      <View
        style={[
          styles.shape,
          {
            backgroundColor: currentColor,
            height: d,
            width: d,
            left: posX,
            top: posY,
            borderRadius: '50%',
          },
        ]}
      />
    );
  };

  const generateRandomShape = () => {
    const shape = Math.random() > 0.5 ? getRectangle() : getCircle();
    setCurrentShapes(preV => [...preV, shape]);
  };

  const generateNewColor = () => {
    let newColor = '#';
    const choices = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      newColor += choices[Math.floor(Math.random() * choices.length)];
    }
    setCurrentColor(newColor);
  };

  useEffect(() => {
    if (hasMounted.current) generateRandomShape();
    else hasMounted.current = true;
  }, [currentColor]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={[styles.container, {backgroundColor: currentColor}]}
        onLayout={event => {
          const {height, width} = event.nativeEvent.layout;
          setContainerDimensions({height, width});
        }}>
        <TouchableOpacity style={styles.btn} onPress={generateNewColor}>
          <Text style={styles.pressMeTxt}>Press me!</Text>
        </TouchableOpacity>
        {currentShapes.map((Shape: JSX.Element, i) => {
          return React.cloneElement(Shape, {key: i});
        })}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  pressMeTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    elevation: 8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    zIndex: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shape: {
    position: 'absolute',
    borderWidth: 2,
  },
});
